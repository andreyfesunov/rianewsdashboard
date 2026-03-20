import { Page } from '@/news/domain/models/page';
import { News } from '@/news/domain/models/news';
import { NewsQuery } from '@/news/domain/models/query';
import { NewsRepository } from '@/news/domain/repositories/news.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  public constructor(private readonly repository: NewsRepository) {}

  public async search(query: NewsQuery): Promise<Page<News>> {
    return this.repository.search(query);
  }
}
