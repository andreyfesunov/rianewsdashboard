from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from ria_exporter.api.v1 import v1_router
from ria_exporter.config import get_settings
from ria_exporter.scraper.service import RiaSearchService
from ria_exporter.scraper.tags_service import RiaTagsService


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    settings = get_settings()
    search_service = RiaSearchService(settings)
    tags_service = RiaTagsService(settings)
    app.state.search_service = search_service
    app.state.tags_service = tags_service
    yield
    search_service.close()
    tags_service.close()


app = FastAPI(title="RIA Exporter", lifespan=lifespan)
app.include_router(v1_router, prefix="/api/v1")


if __name__ == "__main__":
    from uvicorn import run

    run(app, host="0.0.0.0", port=8000)
