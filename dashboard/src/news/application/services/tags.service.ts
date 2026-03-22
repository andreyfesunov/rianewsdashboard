import { TagSuggestion } from '@/news/domain/models/tags/tags';
import { TagSuggestQuery } from '@/news/domain/models/tags/query';
import { TagsRepository } from '@/news/domain/repositories/tags.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
  public constructor(private readonly repository: TagsRepository) {}

  public async suggest(
    query: TagSuggestQuery,
  ): Promise<readonly TagSuggestion[]> {
    return this.repository.suggest(query);
  }
}
