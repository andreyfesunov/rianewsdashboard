# RIA Exporter

Сервис на **FastAPI**: ходит на РИА (поиск материалов и подсказки по тегам), разбирает HTML через **BeautifulSoup**, отдаёт нормализованный JSON. Запросы идут через **requests** с ограничением частоты (**requests-ratelimiter**), настройки — через **pydantic-settings** (префикс `RIA_EXPORTER_`).

## Тесты

Обычный прогон без сети к РИА:

```bash
poetry run pytest
```

Парсер и API покрыты тестами на **зафиксированном HTML** в `tests/fixtures/`.

Отдельно есть **live**-тесты: они дергают настоящий `ria.ru`. Включай только осознанно:

```bash
set RUN_LIVE_RIA_TESTS=1
poetry run pytest -m live
```

(В PowerShell: `$env:RUN_LIVE_RIA_TESTS=1`.) Маркер `live` описан в `pyproject.toml`.
