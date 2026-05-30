import asyncio
import os
import mimetypes
import re
from typing import List, Optional
from urllib.parse import unquote, urlparse

import aiohttp

import uuid


def _filename_from_content_disposition(content_disposition: str) -> Optional[str]:
    """Extract a filename from a Content-Disposition header value.

    Prefers the RFC 5987 ``filename*=charset'lang'<pct-encoded>`` form (used by
    servers to carry non-ASCII / Chinese names) and percent-decodes it with the
    declared charset, falling back to plain ``filename="..."``. Defensive: any
    parsing problem falls back to ``None`` so the caller keeps its prior
    behavior instead of raising.
    """
    if not content_disposition:
        return None

    try:
        # RFC 5987 extended form takes precedence: filename*=UTF-8''%E4%B8%AD.pdf
        ext_match = re.search(
            r"filename\*\s*=\s*([^']*)'[^']*'([^;]+)",
            content_disposition,
            re.IGNORECASE,
        )
        if ext_match:
            charset = (ext_match.group(1) or "utf-8").strip() or "utf-8"
            raw_value = ext_match.group(2).strip().strip("\"'")
            try:
                decoded = unquote(raw_value, encoding=charset, errors="replace")
            except (LookupError, ValueError):
                decoded = unquote(raw_value, encoding="utf-8", errors="replace")
            decoded = decoded.strip()
            if decoded:
                return decoded

        # Plain form: filename="中文.pdf" or filename=foo.pdf
        plain_match = re.search(
            r'filename\s*=\s*"([^"]*)"|filename\s*=\s*([^;]+)',
            content_disposition,
            re.IGNORECASE,
        )
        if plain_match:
            value = (plain_match.group(1) or plain_match.group(2) or "").strip()
            value = value.strip("\"'")
            if value:
                return value
    except Exception:
        return None

    return None


async def download_file(
    url: str, save_directory: str, headers: Optional[dict] = None
) -> Optional[str]:
    try:
        os.makedirs(save_directory, exist_ok=True)

        parsed_url = urlparse(url)
        filename = os.path.basename(parsed_url.path)

        if not filename or "." not in filename:
            async with aiohttp.ClientSession(trust_env=True) as session:
                async with session.head(url, headers=headers) as response:
                    if response.status == 200:
                        content_disposition = response.headers.get(
                            "Content-Disposition", ""
                        )
                        parsed_name = _filename_from_content_disposition(
                            content_disposition
                        )
                        if parsed_name:
                            filename = parsed_name
                        else:
                            content_type = response.headers.get("Content-Type", "")
                            if content_type:
                                extension = mimetypes.guess_extension(
                                    content_type.split(";")[0]
                                )
                                if extension:
                                    filename = f"{uuid.uuid4()}{extension}"

        # A server-supplied filename must never escape save_directory; keep only
        # the basename so "../" or absolute paths can't redirect the write.
        filename = os.path.basename(filename or "")
        filename = filename or str(uuid.uuid4())
        save_path = os.path.join(save_directory, filename)

        async with aiohttp.ClientSession(trust_env=True) as session:
            async with session.get(url, headers=headers) as response:
                if response.status == 200:
                    with open(save_path, "wb") as file:
                        async for chunk in response.content.iter_chunked(8192):
                            file.write(chunk)
                    print(f"File downloaded successfully: {save_path}")
                    return save_path
                else:
                    print(f"Failed to download file. HTTP status: {response.status}")
                    return None

    except Exception as e:
        print(f"Error downloading file from {url}: {e}")
        return None


async def download_files(
    urls: List[str], save_directory: str, headers: Optional[dict] = None
) -> List[Optional[str]]:
    print(f"Starting download of {len(urls)} files to {save_directory}")
    coroutines = [download_file(url, save_directory, headers) for url in urls]
    results = await asyncio.gather(*coroutines, return_exceptions=True)
    final_results = []
    for i, result in enumerate(results):
        if isinstance(result, Exception):
            print(f"Exception during download of {urls[i]}: {result}")
            final_results.append(None)
        else:
            final_results.append(result)

    successful_downloads = sum(1 for result in final_results if result is not None)
    print(
        f"Download completed: {successful_downloads}/{len(urls)} files downloaded successfully"
    )

    return final_results
