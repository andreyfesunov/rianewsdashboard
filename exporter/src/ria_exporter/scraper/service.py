from __future__ import annotations

import re

import requests

from ria_exporter.api.schemas import NewsOut, NewsQueryIn, PageOut
from ria_exporter.config import Settings
from ria_exporter.scraper.errors import RiaResponseError
from ria_exporter.scraper.parser import parse_search_html
from ria_exporter.scraper.session import build_session


def _safe_string_to_int(value: str | None) -> int:
    if not value:
        return 0
    digits = re.sub(r"\D", "", value)
    return int(digits) if digits else 0


class RiaSearchService:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        proxy = str(settings.proxy_url) if settings.proxy_url else None
        self._session = build_session(proxy, settings.rate_limit_rpm)

    def close(self) -> None:
        self._session.close()

    def _build_params(self, query: NewsQueryIn) -> list[tuple[str, str | int]]:
        ps = self._settings.page_size
        params: list[tuple[str, str | int]] = [
            ("query", query.query),
            ("offset", (query.page - 1) * ps),
        ]
        for tag in query.tags:
            params.append(("list_sids[]", tag))
        for sort in query.sort:
            params.append(("sort[]", sort))
        return params

    def search(self, query: NewsQueryIn) -> PageOut:
        url = str(self._settings.search_url)
        try:
            response = self._session.get(
                url,
                params=self._build_params(query),
                timeout=30,
            )
        except requests.RequestException:
            raise
        if response.status_code != 200:
            raise RiaResponseError(response.status_code)

        total, raw_items = parse_search_html(response.text)
        items = [
            NewsOut(
                title=r["title"] or "",
                url=r["url"] or "",
                assets=list(r["assets"]),
                time=r["time"] or "",
                views=_safe_string_to_int(r["views"]),
            )
            for r in raw_items
        ]
        return PageOut(
            page=query.page,
            size=self._settings.page_size,
            total=total if total is not None else 0,
            items=items,
        )
