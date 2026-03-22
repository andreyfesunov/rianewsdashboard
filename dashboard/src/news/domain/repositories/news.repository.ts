import { News } from '@/news/domain/models/news/news';
import { NewsQuery } from '@/news/domain/models/news/query';
import { Page } from '@/news/domain/models/common/page';

export abstract class NewsRepository {
  public abstract search(query: NewsQuery): Promise<Page<News>>;
}
