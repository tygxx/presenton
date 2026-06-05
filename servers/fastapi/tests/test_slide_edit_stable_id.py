"""Editing a slide must keep its primary key stable.

Regression guard for the id-rotation bug: previously `/slide/edit` and
`/slide/edit-html` reassigned `slide.id = uuid.uuid4()` on every edit, which made
the old id a single-use value. Any caller holding the previous id (a replayed
request, an undo snapshot) then hit `404 Slide not found`. The slide's identity
must not change when only its content changes.
"""

import asyncio
import uuid
from typing import Any
from unittest.mock import AsyncMock, MagicMock, patch

import api.v1.ppt.endpoints.slide as slide_module
import services.chat.memory_layer as memory_layer_module
from models.presentation_layout import PresentationLayoutModel, SlideLayoutModel
from models.sql.presentation import PresentationModel
from models.sql.slide import SlideModel


class _FakeSession:
    """Minimal async session double: resolves .get() from a fixed map."""

    def __init__(self, get_results: dict[Any, Any]):
        self._get_results = get_results
        self.commit_count = 0

    async def get(self, _model: Any, key: Any):
        return self._get_results.get(key)

    def add(self, _obj: Any) -> None:
        pass

    def add_all(self, _objs: Any) -> None:
        pass

    async def commit(self) -> None:
        self.commit_count += 1


def _make_presentation(pres_id: uuid.UUID) -> PresentationModel:
    layout = PresentationLayoutModel(
        name="tech-cn",
        ordered=True,
        slides=[
            SlideLayoutModel(
                id="tech-cn:tech-cn-image-right", json_schema={"title": "t"}
            )
        ],
    ).model_dump(mode="json")
    return PresentationModel(
        id=pres_id,
        content="c",
        n_slides=1,
        language="Auto",
        title="T",
        layout=layout,
        tone="default",
        verbosity="standard",
        instructions=None,
    )


def _make_slide(slide_id: uuid.UUID, pres_id: uuid.UUID) -> SlideModel:
    return SlideModel(
        id=slide_id,
        presentation=pres_id,
        layout_group="tech-cn",
        layout="tech-cn:tech-cn-image-right",
        index=1,
        content={"title": "old", "paragraphs": ["a"]},
        html_content="<section>old</section>",
        speaker_note="old note",
        properties=None,
    )


def test_edit_slide_keeps_same_id():
    slide_id = uuid.uuid4()
    pres_id = uuid.uuid4()
    slide = _make_slide(slide_id, pres_id)
    session = _FakeSession({slide_id: slide, pres_id: _make_presentation(pres_id)})

    edited_content = {
        "title": "enriched",
        "paragraphs": ["a", "b", "c"],
        "__speaker_note__": "new note",
    }
    new_layout = SlideLayoutModel(
        id="tech-cn:tech-cn-image-right", json_schema={"title": "t"}
    )

    with patch.object(
        slide_module, "get_slide_layout_from_prompt", AsyncMock(return_value=new_layout)
    ), patch.object(
        slide_module, "get_edited_slide_content", AsyncMock(return_value=edited_content)
    ), patch.object(
        slide_module,
        "process_old_and_new_slides_and_fetch_assets",
        AsyncMock(return_value=[]),
    ), patch.object(
        slide_module, "ImageGenerationService", MagicMock()
    ), patch.object(
        slide_module, "get_images_directory", MagicMock(return_value="/tmp")
    ), patch.object(
        slide_module.MEM0_PRESENTATION_MEMORY_SERVICE,
        "retrieve_context",
        AsyncMock(return_value=""),
    ), patch.object(
        slide_module.MEM0_PRESENTATION_MEMORY_SERVICE,
        "store_slide_edit",
        AsyncMock(return_value=None),
    ):
        result = asyncio.run(
            slide_module.edit_slide(id=slide_id, prompt="丰富下", sql_session=session)
        )

    assert result.id == slide_id  # identity must survive a content edit
    assert result.content == edited_content
    assert result.speaker_note == "new note"


def test_edit_slide_html_keeps_same_id():
    slide_id = uuid.uuid4()
    pres_id = uuid.uuid4()
    slide = _make_slide(slide_id, pres_id)
    session = _FakeSession({slide_id: slide, pres_id: _make_presentation(pres_id)})

    with patch.object(
        slide_module,
        "get_edited_slide_html",
        AsyncMock(return_value="<section>new</section>"),
    ), patch.object(
        slide_module.MEM0_PRESENTATION_MEMORY_SERVICE,
        "retrieve_context",
        AsyncMock(return_value=""),
    ), patch.object(
        slide_module.MEM0_PRESENTATION_MEMORY_SERVICE,
        "store_slide_edit",
        AsyncMock(return_value=None),
    ):
        result = asyncio.run(
            slide_module.edit_slide_html(
                id=slide_id,
                prompt="丰富下",
                html="<section>old</section>",
                sql_session=session,
            )
        )

    assert result.id == slide_id  # identity must survive an html edit
    assert result.html_content == "<section>new</section>"


class _ReplaceSession:
    """Async session double for the chat replace path: get() + scalar()."""

    def __init__(self, presentation: PresentationModel, existing_slide: SlideModel):
        self._presentation = presentation
        self._existing_slide = existing_slide
        self.commit_count = 0

    async def get(self, _model: Any, _key: Any):
        return self._presentation

    async def scalar(self, *_args: Any, **_kwargs: Any):
        return self._existing_slide

    def add(self, _obj: Any) -> None:
        pass

    def add_all(self, _objs: Any) -> None:
        pass

    async def commit(self) -> None:
        self.commit_count += 1


def test_chat_save_slide_replace_keeps_same_id():
    pres_id = uuid.uuid4()
    slide_id = uuid.uuid4()
    existing = _make_slide(slide_id, pres_id)
    session = _ReplaceSession(_make_presentation(pres_id), existing)

    layer = memory_layer_module.PresentationChatMemoryLayer(
        sql_session=session, presentation_id=pres_id
    )
    fake_layout = SlideLayoutModel(
        id="tech-cn:tech-cn-image-right", json_schema={"title": "t"}
    )

    with patch.object(
        layer, "_get_layout_by_id", AsyncMock(return_value=fake_layout)
    ), patch.object(
        layer, "_get_presentation_icon_weight", AsyncMock(return_value="regular")
    ), patch.object(
        layer, "_validate_slide_content", MagicMock(return_value=[])
    ), patch.object(
        layer, "_resolve_layout_group", MagicMock(return_value="tech-cn")
    ), patch.object(
        memory_layer_module, "ImageGenerationService", MagicMock()
    ), patch.object(
        memory_layer_module, "get_images_directory", MagicMock(return_value="/tmp")
    ), patch.object(
        memory_layer_module,
        "process_old_and_new_slides_and_fetch_assets",
        AsyncMock(return_value=[]),
    ), patch.object(
        memory_layer_module.MEM0_PRESENTATION_MEMORY_SERVICE,
        "store_slide_edit",
        AsyncMock(return_value=None),
    ):
        result = asyncio.run(
            layer.save_slide(
                content={"title": "enriched"},
                layout_id="tech-cn:tech-cn-image-right",
                index=1,
                replace_old_slide_at_index=True,
            )
        )

    assert result["saved"] is True
    assert result["slide_id"] == str(slide_id)  # replace must not rotate the id
    assert existing.id == slide_id
