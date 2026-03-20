import { Page } from '@/news/domain/models/page';
import { News } from '@/news/domain/models/news';
import { NewsQuery } from '@/news/domain/models/query';
import { NewsRepository } from '@/news/domain/repositories/news.repository';
import { ExporterClient } from '@/news/infrastructure/clients/exporter.client';

export class NewsRepositoryImpl implements NewsRepository {
  public constructor(private readonly exporterClient: ExporterClient) {}

  public async search(query: NewsQuery): Promise<Page<News>> {
    return this.exporterClient.getNews(query);
  }
}
