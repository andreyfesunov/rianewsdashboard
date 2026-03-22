from __future__ import annotations

from pathlib import Path

from ria_exporter.scraper.parser import parse_search_html, parse_tag_suggestions

_FIXTURES = Path(__file__).resolve().parent / "fixtures"


def test_parse_search_html_extracts_total_and_items() -> None:
    html = (_FIXTURES / "search_sample.html").read_text(encoding="utf-8")
    total, items = parse_search_html(html)

    assert total == 2
    assert len(items) == 2

    first = items[0]
    assert first["title"] == "First headline"
    assert first["url"] == "/20250101/test-1.html"
    assert first["time"] == "01.01.2025 12:00"
    assert first["views"] == "1 234"
    assert first["assets"] == ["https://cdn.example/a.jpg"]

    second = items[1]
    assert second["title"] == "Second headline"
    assert second["url"] == "/20250102/test-2.html"
    assert second["time"] is None
    assert second["views"] is None
    assert second["assets"] == []


def test_parse_search_html_empty_list_no_total() -> None:
    html = (_FIXTURES / "search_empty.html").read_text(encoding="utf-8")
    total, items = parse_search_html(html)

    assert total is None
    assert items == []


def test_parse_search_html_no_list_items_loaded() -> None:
    html = "<html><body></body></html>"
    total, items = parse_search_html(html)

    assert total is None
    assert items == []


def test_parse_tag_suggestions() -> None:
    html = (_FIXTURES / "tags_sample.html").read_text(encoding="utf-8")
    out = parse_tag_suggestions(html)

    assert out == [
        {"value": "18445", "label": "Politics"},
        {"value": "9012", "label": "Economy"},
    ]


def test_parse_tag_suggestions_empty() -> None:
    assert parse_tag_suggestions("<ul></ul>") == []
