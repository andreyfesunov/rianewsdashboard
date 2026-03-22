# RIA Exporter

Сервис скрапинга поиска RIA Novosti с HTTP API.

Запуск (из каталога `exporter` после `poetry install`):

```bash
poetry run uvicorn ria_exporter.main:app --reload --host 0.0.0.0 --port 8000
```

Переменные окружения (префикс `RIA_EXPORTER_`): `RATE_LIMIT_RPM`, `PROXY_URL`, `SEARCH_URL`, `PAGE_SIZE`. См. [`ria_exporter.config.Settings`](src/ria_exporter/config.py).

Ограничение частоты исходящих запросов к RIA: [`requests-ratelimiter`](https://pypi.org/project/requests-ratelimiter/) (`LimiterSession`, `per_minute` из `rate_limit_rpm`).

Для ноутбука: `poetry install --with dev`, затем `import pprint` — из стандартной библиотеки Python; в группе `dev` установлен `ipython` как ядро/REPL для `.ipynb` (отдельного пакета `pprint` на PyPI нет).

## Линтинг и типы

Из каталога `exporter` после `poetry install --with dev`:

```bash
poetry run ruff check src
poetry run ruff format src
poetry run mypy -p ria_exporter
```

Настройки: [`pyproject.toml`](pyproject.toml) (`[tool.ruff]`, `[tool.mypy]`).

Корень репозитория: [`pre-commit`](../.pre-commit-config.yaml) — `ruff-check`, `ruff-format`, `exporter-mypy` (исключён `dashboard/`). Pre-commit обрабатывает **отслеживаемые git** файлы; новый код под `exporter/` нужно добавить в индекс (`git add`), иначе хуки не увидят `.py`.
