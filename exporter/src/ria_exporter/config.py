from __future__ import annotations

from functools import lru_cache

from pydantic import AnyHttpUrl, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="RIA_EXPORTER_",
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    rate_limit_rpm: int | None = 50
    proxy_url: AnyHttpUrl | str | None = None

    search_url: AnyHttpUrl | str = "https://ria.ru/services/search/getmore/"
    page_size: int = Field(default=20, ge=1)

    tags_url: AnyHttpUrl | str = "https://ria.ru/services/tags/gettotal/"
    tags_limit: int = Field(default=50, ge=1)
    tags_xmlview: str = "tags"
    tags_type: str = "tag"
    tags_pagetype: str = "list"


@lru_cache
def get_settings() -> Settings:
    return Settings()
