"""Editing a slide must not crash when an old asset lacks its resolved URL.

Regression guard for `KeyError: '__icon_url__'` (and the parallel image case):
`process_old_and_new_slides_and_fetch_assets` reused an old asset's URL when a new
asset shared the same icon query / image prompt, but indexed `["__icon_url__"]`
directly. If the old content carried an icon with only `__icon_query__` and no
resolved `__icon_url__` (common in LLM-edited content), the edit 500'd. The reuse
must tolerate a missing URL and fall back to fetching.
"""

import asyncio
from unittest.mock import AsyncMock, MagicMock, patch

import utils.process_slides as ps


def test_icon_reuse_tolerates_missing_old_icon_url():
    # old icon has a query but NO resolved __icon_url__
    old = {"items": [{"icon": {"__icon_query__": "rocket"}}]}
    new = {"items": [{"icon": {"__icon_query__": "rocket"}}]}  # same query
    img = MagicMock()

    with patch.object(
        ps.ICON_FINDER_SERVICE, "search_icons", AsyncMock(return_value=[])
    ):
        assets = asyncio.run(
            ps.process_old_and_new_slides_and_fetch_assets(
                img, old, new, icon_weight="regular"
            )
        )

    # no KeyError: missing old URL falls through to a (here empty) fetch
    assert assets == []


def test_image_reuse_tolerates_missing_old_image_url():
    # old image has a prompt but NO resolved __image_url__
    old = {"hero": {"__image_prompt__": "deep space"}}
    new = {"hero": {"__image_prompt__": "deep space"}}  # same prompt
    img = MagicMock()
    img.generate_image = AsyncMock(return_value="https://cdn.example/space.png")

    with patch.object(
        ps.ICON_FINDER_SERVICE, "search_icons", AsyncMock(return_value=[])
    ):
        asyncio.run(
            ps.process_old_and_new_slides_and_fetch_assets(
                img, old, new, icon_weight="regular"
            )
        )

    # no KeyError: missing old URL falls through to fetching a fresh image
    assert new["hero"].get("__image_url__")
