import os
from typing import Optional, Union

from utils.get_env import get_temp_directory_env
import uuid

try:
    from pathvalidate import sanitize_filename as _pv_sanitize_filename
except Exception:  # pragma: no cover - pathvalidate is a declared dependency
    _pv_sanitize_filename = None


def sanitize_upload_filename(filename: Optional[str]) -> str:
    """Make a user-supplied upload filename safe to use as a single path
    component while preserving non-ASCII (e.g. Chinese) characters.

    Defends against path traversal: strips directory components, null bytes and
    leading dots so values like ``../../etc/passwd``, ``/abs/path`` or
    ``C:\\x.txt`` collapse to a harmless basename. Chinese characters are kept
    intact (no ``strip``/``encode('ascii')`` that would drop them).
    """
    name = (filename or "").strip()

    # Drop any directory portion regardless of separator style; this alone
    # neutralizes "../" and absolute paths.
    name = name.replace("\\", "/").rsplit("/", 1)[-1]
    name = name.replace("\x00", "")

    if _pv_sanitize_filename is not None:
        try:
            name = _pv_sanitize_filename(name)
        except Exception:
            pass

    # Guard against names that are only dots (".", "..") or start with dots in a
    # way that could still resolve to a parent reference after sanitization.
    name = name.lstrip(".")
    name = name.strip()

    return name or str(uuid.uuid4())


class TempFileService:

    def __init__(self):
        self.base_dir = get_temp_directory_env() or "/tmp/presenton"
        self.cleanup_base_dir()
        os.makedirs(self.base_dir, exist_ok=True)

    def create_dir_in_dir(self, base_dir: str, dir_name: Optional[str] = None) -> str:
        temp_dir = os.path.join(base_dir, dir_name if dir_name else str(uuid.uuid4()))
        os.makedirs(temp_dir, exist_ok=True)
        return temp_dir

    def create_temp_dir(self, dir_name: Optional[str] = None) -> str:
        return self.create_dir_in_dir(self.base_dir, dir_name)

    def create_temp_file_path(
        self, file_path: str, dir_path: Optional[str] = None
    ) -> str:
        if dir_path is None:
            dir_path = self.base_dir

        # Sanitize only the final filename component so a user-supplied name
        # (e.g. an upload) can't traverse out of dir_path, while still keeping
        # Chinese characters and any intentional sub-directory prefix intact.
        head, tail = os.path.split(file_path)
        safe_tail = sanitize_upload_filename(tail)
        full_path = (
            os.path.join(dir_path, head, safe_tail)
            if head
            else os.path.join(dir_path, safe_tail)
        )

        # Containment guard: if a "../" in the (non-sanitized) head portion would
        # let the path escape dir_path, drop the head and place the file directly
        # under dir_path. Legitimate nested sub-directories (which resolve inside
        # dir_path) are preserved unchanged.
        base_real = os.path.realpath(dir_path)
        full_real = os.path.realpath(full_path)
        if full_real != base_real and not full_real.startswith(base_real + os.sep):
            full_path = os.path.join(dir_path, safe_tail)

        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        return full_path

    def create_temp_file(
        self, file_path: str, content: Union[bytes, str], dir_path: Optional[str] = None
    ) -> str:
        file_path = self.create_temp_file_path(file_path, dir_path)
        mode = "wb" if isinstance(content, bytes) else "w"
        with open(file_path, mode) as f:
            f.write(content)

        return file_path

    def read_temp_file(self, file_path: str, binary: bool = True) -> Union[bytes, str]:
        mode = "rb" if binary else "r"
        with open(file_path, mode) as f:
            return f.read()

    def cleanup_temp_file(self, file_path: str):
        if os.path.exists(file_path):
            os.remove(file_path)

    def delete_dir_files(self, dir_path: str):
        if os.path.exists(dir_path):
            for root, dirs, files in os.walk(dir_path, topdown=False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))

    def cleanup_temp_dir(self, dir_path: str):
        if os.path.exists(dir_path):
            self.delete_dir_files(dir_path)
            os.rmdir(dir_path)

    def cleanup_base_dir(self):
        self.cleanup_temp_dir(self.base_dir)


TEMP_FILE_SERVICE = TempFileService()
