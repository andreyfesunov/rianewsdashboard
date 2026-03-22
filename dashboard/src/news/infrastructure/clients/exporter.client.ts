import { News } from '@/news/domain/models/news/news';
import { Page } from '@/news/domain/models/common/page';
import { NewsQuery } from '@/news/domain/models/news/query';
import { TagSuggestion } from '@/news/domain/models/tags/tags';
import { TagSuggestQuery } from '@/news/domain/models/tags/query';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export class ExporterClient {
  public constructor(private readonly http: HttpService) {}

  public async getNews(query: NewsQuery): Promise<Page<News>> {
    const { data } = await firstValueFrom(
      this.http.post<Page<News>>('/api/v1/news/search', {
        page: query.page,
        query: query.query,
        sort: query.sort,
        tags: query.tags,
      }),
    );

    return data;
  }

  public async suggestTags(
    query: TagSuggestQuery,
  ): Promise<readonly TagSuggestion[]> {
    const { data } = await firstValueFrom(
      this.http.post<readonly TagSuggestion[]>('/api/v1/tags/suggest', {
        page: query.page,
        query: query.query,
      }),
    );

    return data;
  }
}
