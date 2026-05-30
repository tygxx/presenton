import asyncio
import re
from typing import List

from models.document_chunk import DocumentChunk

# Heuristic CJK detection (no third-party dependency): count characters in the
# common CJK / fullwidth ranges. Used only to pick a splitting strategy for the
# headingless fallback; Latin documents keep their original behavior.
_CJK_RE = re.compile(r"[一-鿿　-〿＀-￯]")

# A single heading-derived chunk larger than this many characters is considered
# "too large" and gets sub-split by the windowed fallback.
_MAX_CHUNK_CHARS = 4000


def _cjk_ratio(text: str) -> float:
    if not text:
        return 0.0
    cjk = len(_CJK_RE.findall(text))
    return cjk / len(text)


def _is_cjk_heavy(text: str) -> bool:
    # 0.2 keeps mixed CJK/Latin technical docs (with English terms/code) on the
    # CJK path while leaving predominantly-Latin text untouched.
    return _cjk_ratio(text) >= 0.2


class ScoreBasedChunker:

    def extract_headings(self, text: str) -> List[str]:
        lines = text.split("\n")
        headings = []
        
        for line in lines:
            line = line.strip()
            if line.startswith("#"):
                headings.append(line)
        
        return headings

    def score_headings(self, headings: List[str]) -> List[float]:
        heading_scores = []
        last_heading_index = -1
        first_heading_found = False

        for i, heading in enumerate(headings):
            score = 0.0
            
            heading_level = len(heading) - len(heading.lstrip("#"))
            
            if heading_level <= 3:
                score += 10.0 - (heading_level - 1) * 2.0
            else:
                score += 4.0 - (heading_level - 4) * 0.5

            if not first_heading_found:
                score += 5.0
                first_heading_found = True

            if last_heading_index != -1:
                distance = i - last_heading_index
                distance_bonus = min(5.0, distance * 0.5)
                score += distance_bonus

            last_heading_index = i
            heading_scores.append(score)

        return heading_scores

    def _split_into_windows(self, text: str, n: int) -> List[str]:
        """Split ``text`` into up to ``n`` non-empty windows of roughly equal
        size, used as a fallback when there is no heading structure to chunk on.

        For CJK-heavy text we slice by character count (CJK has no word spaces),
        otherwise we slice on whitespace boundaries so Latin words stay intact.
        """
        text = (text or "").strip()
        if not text or n <= 0:
            return []
        if n == 1:
            return [text]

        total = len(text)
        target = max(1, total // n)
        windows: List[str] = []

        if _is_cjk_heavy(text):
            # Prefer to break at a newline near each window boundary so we don't
            # cut mid-sentence when a paragraph break is conveniently close.
            start = 0
            while start < total and len(windows) < n:
                # Last window takes the remainder.
                if len(windows) == n - 1:
                    windows.append(text[start:])
                    break
                end = min(total, start + target)
                break_at = text.rfind("\n", start + 1, end + 1)
                if break_at <= start:
                    break_at = end
                windows.append(text[start:break_at])
                start = break_at
            if start < total and len(windows) < n:
                windows.append(text[start:])
        else:
            words = text.split()
            if not words:
                return [text]
            per = max(1, len(words) // n)
            for i in range(0, len(words), per):
                windows.append(" ".join(words[i : i + per]))
                if len(windows) == n:
                    # Fold any trailing words into the last window.
                    remaining = words[i + per :]
                    if remaining:
                        windows[-1] = windows[-1] + " " + " ".join(remaining)
                    break

        return [w.strip() for w in windows if w and w.strip()]

    def _fallback_chunks(self, text: str, top_k: int) -> List[DocumentChunk]:
        """Build chunks by length-based windowing when heading structure is
        absent (common for CJK long-form documents without Markdown headings)."""
        windows = self._split_into_windows(text, max(1, top_k))
        fallback: List[DocumentChunk] = []
        for idx, window in enumerate(windows):
            fallback.append(
                DocumentChunk(
                    heading="",
                    content=window,
                    heading_index=idx,
                    score=0.0,
                )
            )
        return fallback

    def get_chunks_from_headings(
        self,
        text: str,
        headings: List[str],
        heading_scores: List[float],
        top_k: int = 10,
    ) -> List[DocumentChunk]:
        if not heading_scores:
            heading_scores = self.score_headings(headings)

        chunks = []
        heading_indices = []

        for i, score in enumerate(heading_scores):
            if score > 0:
                heading_indices.append((i, score))

        if len(heading_indices) == 0:
            # No usable headings (e.g. a headingless Chinese document): fall back
            # to fixed-size windows so we still produce chunks instead of zero.
            return self._fallback_chunks(text, top_k)

        heading_indices.sort(key=lambda x: (-x[1], x[0]))

        if len(heading_indices) <= top_k:
            selected_indices = [idx for idx, _ in heading_indices]
            selected_indices.sort()
        else:
            score_groups = {}
            for idx, score in heading_indices:
                rounded_score = round(score)
                if rounded_score not in score_groups:
                    score_groups[rounded_score] = []
                score_groups[rounded_score].append(idx)

            sorted_groups = sorted(
                score_groups.items(), key=lambda x: x[0], reverse=True
            )

            selected_indices = []

            for score, indices in sorted_groups:
                indices.sort()
                remaining_needed = top_k - len(selected_indices)

                if remaining_needed <= 0:
                    break

                if len(indices) <= remaining_needed:
                    selected_indices.extend(indices)
                else:
                    if remaining_needed == 1:
                        mid_idx = len(indices) // 2
                        selected_indices.append(indices[mid_idx])
                    elif remaining_needed == 2:
                        selected_indices.append(indices[0])
                        selected_indices.append(indices[-1])
                    else:
                        step = (len(indices) - 1) / (remaining_needed - 1)

                        for i in range(remaining_needed):
                            index = int(round(i * step))
                            if index < len(indices):
                                selected_indices.append(indices[index])

            selected_indices.sort()

        lines = text.split("\n")
        heading_positions = {}
        
        for i, line in enumerate(lines):
            line_stripped = line.strip()
            if line_stripped.startswith("#"):
                for heading_idx, heading in enumerate(headings):
                    if heading == line_stripped and heading_idx not in heading_positions:
                        heading_positions[heading_idx] = i
                        break
        
        for i, heading_idx in enumerate(selected_indices):
            if heading_idx not in heading_positions:
                continue
                
            heading = headings[heading_idx]
            heading_line_idx = heading_positions[heading_idx]
            
            if i + 1 < len(selected_indices):
                next_heading_idx = selected_indices[i + 1]
                if next_heading_idx in heading_positions:
                    next_heading_line_idx = heading_positions[next_heading_idx]
                    content_end = next_heading_line_idx
                else:
                    content_end = len(lines)
            else:
                content_end = len(lines)

            content_lines = lines[heading_line_idx + 1 : content_end]
            content = "\n".join(content_lines).strip()

            chunk = DocumentChunk(
                heading=heading,
                content=content,
                heading_index=heading_idx,
                score=heading_scores[heading_idx],
            )
            chunks.append(chunk)
            
        return chunks

    def _ensure_n_chunks(
        self, text: str, chunks: List[DocumentChunk], n: int
    ) -> List[DocumentChunk]:
        """Secondary fallback so a long document with little/no heading structure
        still yields ``n`` chunks instead of raising.

        Handles two cases:
        - A single oversized chunk (one big block) is sub-split by windowing.
        - Fewer than ``n`` chunks overall: top up from windowed splits of the
          full text.
        """
        if n <= 0 or not (text or "").strip():
            return chunks

        # One big block that is too large to be a single slide: window it.
        if len(chunks) == 1 and len(chunks[0].content or "") > _MAX_CHUNK_CHARS:
            base = chunks[0]
            windows = self._split_into_windows(base.content, n)
            if len(windows) > 1:
                chunks = [
                    DocumentChunk(
                        heading=base.heading if i == 0 else "",
                        content=window,
                        heading_index=i,
                        score=base.score,
                    )
                    for i, window in enumerate(windows)
                ]

        # Still short of the requested count: derive the remainder from windows.
        if len(chunks) < n:
            windows = self._split_into_windows(text, n)
            if len(windows) > len(chunks):
                chunks = self._fallback_chunks(text, n)

        return chunks

    async def get_n_chunks(self, text: str, n: int) -> List[DocumentChunk]:
        headings = await asyncio.to_thread(self.extract_headings, text)
        heading_scores = await asyncio.to_thread(self.score_headings, headings)
        chunks = await asyncio.to_thread(
            self.get_chunks_from_headings, text, headings, heading_scores, n
        )
        if len(chunks) < n:
            chunks = await asyncio.to_thread(self._ensure_n_chunks, text, chunks, n)
        if len(chunks) < n:
            raise ValueError(f"Only {len(chunks)} chunks found, requested {n}")
        return chunks
