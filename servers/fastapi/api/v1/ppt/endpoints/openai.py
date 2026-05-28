from typing import Annotated, List
from fastapi import APIRouter, Body, HTTPException

from utils.available_models import (
    list_available_openai_compatible_models,
    probe_openai_compatible_chat_completion,
)

OPENAI_ROUTER = APIRouter(prefix="/openai", tags=["OpenAI"])


@OPENAI_ROUTER.post("/models/available", response_model=List[str])
async def get_available_models(
    url: Annotated[str, Body()],
    api_key: Annotated[str, Body()],
):
    try:
        return await list_available_openai_compatible_models(url, api_key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@OPENAI_ROUTER.post("/models/probe")
async def probe_openai_compatible_model(
    url: Annotated[str, Body()],
    api_key: Annotated[str, Body()],
    model: Annotated[str, Body()],
):
    """Validate an OpenAI-compatible endpoint by issuing a minimal chat completion
    against the user-supplied model. Returns 200 if the call succeeds; surfaces the
    provider's error in `detail` otherwise. Use this for providers that do not
    expose `/v1/models` (e.g. Volcengine ARK coding plan)."""
    try:
        await probe_openai_compatible_chat_completion(url, api_key, model)
        return {"ok": True}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
