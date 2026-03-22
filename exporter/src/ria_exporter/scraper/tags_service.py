from __future__ import annotations

import requests

from ria_exporter.api.schemas import TagItemOut, TagSuggestQueryIn
from ria_exporter.config import Settings
from ria_exporter.scraper.errors import RiaResponseError
from ria_exporter.scraper.parser import parse_tag_suggestions
from ria_exporter.scraper.session import build_session


class RiaTagsService:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        proxy = str(settings.proxy_url) if settings.proxy_url else None
        self._session = build_session(proxy, settings.rate_limit_rpm)

    def close(self) -> None:
        self._session.close()

    def suggest(self, query: TagSuggestQueryIn) -> list[TagItemOut]:
        limit = self._settings.tags_limit
        params: list[tuple[str, str | int]] = [
            ("query", query.query),
            ("offset", (query.page - 1) * limit),
            ("limit", limit),
            ("xmlview", self._settings.tags_xmlview),
            ("type", self._settings.tags_type),
            ("pagetype", self._settings.tags_pagetype),
        ]
        url = str(self._settings.tags_url)
        try:
            response = self._session.get(url, params=params, timeout=30)
        except requests.RequestException:
            raise
        if response.status_code != 200:
            raise RiaResponseError(response.status_code)

        raw = parse_tag_suggestions(response.text)
        return [TagItemOut(value=r["value"], label=r["label"]) for r in raw]
