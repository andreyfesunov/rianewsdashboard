import { Page } from '@/news/domain/models/common/page';
import { News } from '@/news/domain/models/news/news';
import type { PageNewsResponse } from '@/news/presentation/schemas/news.schemas';

export function pageNewsToResponse(page: Page<News>): PageNewsResponse {
  return {
    page: page.page,
    size: page.size,
    total: page.total,
    items: page.items.map((item) => ({
      title: item.title,
      url: item.url,
      assets: [...item.assets],
      time: item.time,
      views: item.views,
    })),
  };
}
