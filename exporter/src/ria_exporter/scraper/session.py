from __future__ import annotations

from requests import Session
from requests_ratelimiter import LimiterSession


def build_session(proxy_url: str | None, rate_limit_rpm: int | None) -> Session:
    if rate_limit_rpm is not None and rate_limit_rpm > 0:
        session: Session = LimiterSession(per_minute=rate_limit_rpm)
    else:
        session = Session()
    if proxy_url:
        session.proxies.update({"http": proxy_url, "https": proxy_url})
    session.headers.setdefault(
        "User-Agent",
        "ria-exporter/0.1 (+https://github.com/)",
    )
    return session
