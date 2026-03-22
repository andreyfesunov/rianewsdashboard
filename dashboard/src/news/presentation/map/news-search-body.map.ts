import { NewsQuery } from '@/news/domain/models/news/query';
import type { NewsSearchBody } from '@/news/presentation/contracts/news-search.body';

export function newsSearchBodyToQuery(body: NewsSearchBody): NewsQuery {
  return {
    page: body.page,
    query: body.query,
    sort: [...body.sort],
    tags: [...body.tags],
  };
}
