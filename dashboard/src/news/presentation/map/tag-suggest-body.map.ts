import { TagSuggestQuery } from '@/news/domain/models/tags/query';
import type { TagSuggestBody } from '@/news/presentation/contracts/tag-suggest.body';

export function tagSuggestBodyToQuery(body: TagSuggestBody): TagSuggestQuery {
  return {
    page: body.page,
    query: body.query,
  };
}
