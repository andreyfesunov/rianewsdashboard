import { NewsService } from '@/news/application/services/news.service';
import { newsDashboardQueryToNewsQuery } from '@/news/presentation/map/news-dashboard-query.map';
import { newsPageToDashboardView } from '@/news/presentation/map/news-dashboard-view.map';
import { pageNewsToResponse } from '@/news/presentation/map/page-news-response.map';
import { NewsDashboardQueryDto } from '@/news/presentation/schemas/news-dashboard.schemas';
import { Controller, Get, Query, Redirect, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('dashboard')
export class NewsMvcController {
  public constructor(private readonly newsService: NewsService) {}

  @Get()
  @Redirect('/dashboard/news', 302)
  public root(): void {}

  @Get('news')
  @Render('news')
  public async news(
    @Query() query: NewsDashboardQueryDto,
  ): Promise<Record<string, unknown>> {
    const newsQuery = newsDashboardQueryToNewsQuery(query);
    const data = pageNewsToResponse(await this.newsService.search(newsQuery));
    return newsPageToDashboardView(query, data);
  }
}
