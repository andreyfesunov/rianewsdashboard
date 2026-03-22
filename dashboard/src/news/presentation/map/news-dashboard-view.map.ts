import { dashboardNewsUrl } from '@/news/presentation/mvc/utils/dashboard-url.util';
import type { PageNewsResponse } from '@/news/presentation/schemas/news.schemas';
import type { NewsDashboardQuery } from '@/news/presentation/schemas/news-dashboard.schemas';

export function newsPageToDashboardView(
  query: NewsDashboardQuery,
  data: PageNewsResponse,
): Record<string, unknown> {
  const totalPages = Math.max(1, Math.ceil(data.total / data.size));
  return {
    q: query.q,
    selectedTags: query.tags,
    selectedTagsJson: JSON.stringify([...query.tags]),
    ...data,
    totalPages,
    hasPrev: data.page > 1,
    hasNext: data.page < totalPages,
    prevHref: dashboardNewsUrl(query.q, data.page - 1, query.tags),
    nextHref: dashboardNewsUrl(query.q, data.page + 1, query.tags),
  };
}
