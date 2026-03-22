from __future__ import annotations

from typing import Any

from bs4 import BeautifulSoup


def parse_search_html(html: str) -> tuple[int | None, list[dict[str, Any]]]:
    soup = BeautifulSoup(html, "html.parser")

    list_items_loaded = soup.find("div", class_="list-items-loaded")
    total = (
        int(str(list_items_loaded["data-count"]))
        if list_items_loaded and list_items_loaded.has_attr("data-count")
        else None
    )

    items: list[dict[str, Any]] = []
    for item_div in soup.find_all("div", class_="list-item"):
        title_a = item_div.find("a", class_="list-item__title")
        title = title_a.get_text(strip=True) if title_a else None
        link = title_a["href"] if title_a and title_a.has_attr("href") else None

        time_div = item_div.find(
            "div",
            class_="list-item__info-item",
            attrs={"data-type": "date"},
        )
        time = time_div.get_text(strip=True) if time_div else None

        views_div = item_div.find(
            "div",
            class_="list-item__info-item",
            attrs={"data-type": "views"},
        )
        views = None
        if views_div:
            views_span = views_div.find("span")
            views = views_span.get_text(strip=True) if views_span else None

        assets: list[str] = []
        img_link = item_div.find("a", class_="list-item__image")
        if img_link:
            imgs = img_link.find_all("img")
            assets = [str(img["src"]) for img in imgs if img.has_attr("src")]

        items.append(
            {
                "title": title,
                "time": time,
                "views": views,
                "assets": assets,
                "url": link,
            }
        )

    return total, items
