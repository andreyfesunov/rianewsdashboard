from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from ria_exporter.api.v1 import v1_router
from ria_exporter.config import get_settings
from ria_exporter.scraper.service import RiaSearchService


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    settings = get_settings()
    service = RiaSearchService(settings)
    app.state.search_service = service
    yield
    service.close()


app = FastAPI(title="RIA Exporter", lifespan=lifespan)
app.include_router(v1_router, prefix="/api/v1")
