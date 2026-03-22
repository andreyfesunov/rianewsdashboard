from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from ria_exporter.api.schemas import NewsQueryIn, TagSuggestQueryIn
from ria_exporter.config import Settings
from ria_exporter.main import app
from ria_exporter.scraper.service import RiaSearchService
from ria_exporter.scraper.tags_service import RiaTagsService


@pytest.mark.live
def test_ria_search_service_returns_page() -> None:
    settings = Settings(rate_limit_rpm=30)
    service = RiaSearchService(settings)
    try:
        page = service.search(
            NewsQueryIn(page=1, query="Россия", sort=[], tags=[]),
        )
    finally:
        service.close()

    assert page.page == 1
    assert page.size >= 1
    assert page.total >= 0
    assert isinstance(page.items, list)
    for item in page.items:
        assert isinstance(item.title, str)
        assert isinstance(item.url, str)
        assert isinstance(item.views, int)


@pytest.mark.live
def test_ria_tags_service_returns_suggestions() -> None:
    settings = Settings(rate_limit_rpm=30)
    service = RiaTagsService(settings)
    try:
        items = service.suggest(TagSuggestQueryIn(page=1, query="пол"))
    finally:
        service.close()

    assert isinstance(items, list)
    for tag in items:
        assert isinstance(tag.value, str)
        assert isinstance(tag.label, str)


@pytest.mark.live
def test_api_news_search_live() -> None:
    with TestClient(app) as client:
        response = client.post(
            "/api/v1/news/search",
            json={
                "page": 1,
                "query": "Россия",
                "sort": [],
                "tags": [],
            },
        )

    assert response.status_code == 200
    data = response.json()
    assert data["page"] == 1
    assert "size" in data and isinstance(data["size"], int)
    assert "total" in data and isinstance(data["total"], int)
    assert "items" in data and isinstance(data["items"], list)
    if data["items"]:
        first = data["items"][0]
        for key in ("title", "url", "assets", "time", "views"):
            assert key in first


@pytest.mark.live
def test_api_tags_suggest_live() -> None:
    with TestClient(app) as client:
        response = client.post(
            "/api/v1/tags/suggest",
            json={"page": 1, "query": "пол"},
        )

    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if data:
        assert "value" in data[0] and "label" in data[0]
