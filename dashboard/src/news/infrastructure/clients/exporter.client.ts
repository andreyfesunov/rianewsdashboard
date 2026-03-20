import { News } from '@/news/domain/models/news';
import { Page } from '@/news/domain/models/page';
import { NewsQuery } from '@/news/domain/models/query';
import { HttpService } from '@nestjs/axios';

export class ExporterClient {
  public constructor(private readonly http: HttpService) {}

  public async getNews(query: NewsQuery): Promise<Page<News>> {
    return Promise.resolve({
      page: query.page,
      size: 20,
      total: 0,
      items: [],
    });
  }
}
