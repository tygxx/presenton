"""Loopback hosts must never survive in stored slide asset URLs.

A FastAPI-served asset path (/static, /app_data) behind a loopback host
(http://127.0.0.1:8000/static/...) is never reachable from the user's browser.
Such URLs leaked into content historically (and the edit asset-reuse path copies
old URLs verbatim), so normalization must reduce them to same-origin relative paths.
External media (https stock images) must be left untouched.
"""

from utils.asset_directory_utils import normalize_slide_asset_url


def test_strips_loopback_static_and_app_data_host():
    assert (
        normalize_slide_asset_url("http://127.0.0.1:8000/static/icons/regular/x.svg")
        == "/static/icons/regular/x.svg"
    )
    assert (
        normalize_slide_asset_url("http://localhost:8000/app_data/images/y.png")
        == "/app_data/images/y.png"
    )


def test_keeps_external_https_and_relative():
    # external stock media untouched
    assert (
        normalize_slide_asset_url("https://images.pexels.com/photos/1.jpg")
        == "https://images.pexels.com/photos/1.jpg"
    )
    # already-relative asset stays relative (no public base configured in tests)
    assert normalize_slide_asset_url("/static/icons/regular/x.svg") == (
        "/static/icons/regular/x.svg"
    )
    # a non-loopback host on /static is NOT stripped (e.g. Electron split origin)
    assert (
        normalize_slide_asset_url("https://app.example.com/static/icons/x.svg")
        == "https://app.example.com/static/icons/x.svg"
    )


def test_non_string_passthrough():
    assert normalize_slide_asset_url(None) is None
    assert normalize_slide_asset_url("") == ""
