from __future__ import annotations


class RiaResponseError(Exception):
    __slots__ = ("status_code",)

    def __init__(self, status_code: int) -> None:
        self.status_code = status_code
