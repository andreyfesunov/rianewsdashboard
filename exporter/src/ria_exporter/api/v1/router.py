from __future__ import annotations

from typing import Annotated, cast

import requests
from fastapi import APIRouter, Depends, HTTPException, Request

from ria_exporter.api.schemas import NewsQueryIn, PageOut
from ria_exporter.scraper.service import RiaResponseError, RiaSearchService

router = APIRouter(tags=["news"])


def get_search_service(request: Request) -> RiaSearchService:
    return cast(RiaSearchService, request.app.state.search_service)


@router.post("/news/search", response_model=PageOut)
def search_news(
    body: NewsQueryIn,
    service: Annotated[RiaSearchService, Depends(get_search_service)],
) -> PageOut:
    try:
        return service.search(body)
    except RiaResponseError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"RIA returned HTTP {exc.status_code}",
        ) from exc
    except requests.RequestException as exc:
        raise HTTPException(
            status_code=503,
            detail="Failed to reach RIA search",
        ) from exc
