import type { NewsQuery } from '@/news/domain/models/news/query';
import type { NewsDashboardQuery } from '@/news/presentation/schemas/news-dashboard.schemas';

export function newsDashboardQueryToNewsQuery(
  query: NewsDashboardQuery,
): NewsQuery {
  return {
    page: query.page,
    query: query.q,
    sort: [],
    tags: query.tags,
  };
}
