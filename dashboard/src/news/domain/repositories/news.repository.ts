import { News } from '@/news/domain/models/news';
import { NewsQuery } from '@/news/domain/models/query';
import { Page } from '@/news/domain/models/page';

export abstract class NewsRepository {
  public abstract search(query: NewsQuery): Promise<Page<News>>;
}
