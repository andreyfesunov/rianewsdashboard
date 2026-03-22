FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml poetry.lock ./
COPY src ./src

RUN pip install --no-cache-dir .

EXPOSE 8080

CMD ["sh", "-c", "exec uvicorn ria_exporter.main:app --host 0.0.0.0 --port 8080"]
