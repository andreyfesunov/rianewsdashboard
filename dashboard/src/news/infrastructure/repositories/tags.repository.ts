import { TagSuggestion } from '@/news/domain/models/tags/tags';
import { TagSuggestQuery } from '@/news/domain/models/tags/query';
import { TagsRepository } from '@/news/domain/repositories/tags.repository';
import { ExporterClient } from '@/news/infrastructure/clients/exporter.client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsRepositoryImpl implements TagsRepository {
  public constructor(private readonly exporterClient: ExporterClient) {}

  public async suggest(
    query: TagSuggestQuery,
  ): Promise<readonly TagSuggestion[]> {
    return this.exporterClient.suggestTags(query);
  }
}
