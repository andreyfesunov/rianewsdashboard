import { Page } from '@/news/domain/models/common/page';
import { News } from '@/news/domain/models/news/news';
import { NewsQuery } from '@/news/domain/models/news/query';
import { NewsRepository } from '@/news/domain/repositories/news.repository';
import { ExporterClient } from '@/news/infrastructure/clients/exporter.client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsRepositoryImpl implements NewsRepository {
  public constructor(private readonly exporterClient: ExporterClient) {}

  public async search(query: NewsQuery): Promise<Page<News>> {
    return this.exporterClient.getNews(query);
  }
}
