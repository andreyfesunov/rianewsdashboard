import { TagSuggestion } from '@/news/domain/models/tags/tags';
import { TagSuggestQuery } from '@/news/domain/models/tags/query';

export abstract class TagsRepository {
  public abstract suggest(
    query: TagSuggestQuery,
  ): Promise<readonly TagSuggestion[]>;
}
