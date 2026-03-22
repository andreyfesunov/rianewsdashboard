from pydantic import BaseModel, Field


class NewsQueryIn(BaseModel):
    page: int = Field(ge=1)
    query: str
    sort: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)


class NewsOut(BaseModel):
    title: str
    url: str
    assets: list[str]
    time: str
    views: int


class PageOut(BaseModel):
    page: int
    size: int
    total: int
    items: list[NewsOut]
