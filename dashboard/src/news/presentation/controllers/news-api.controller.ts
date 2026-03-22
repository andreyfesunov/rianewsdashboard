import { NewsService } from '@/news/application/services/news.service';
import { newsSearchBodyToQuery } from '@/news/presentation/map/news-search-body.map';
import { pageNewsToResponse } from '@/news/presentation/map/page-news-response.map';
import {
  NewsSearchBodyDto,
  PageNewsDto,
  type PageNewsResponse,
} from '@/news/presentation/schemas/news.schemas';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';

@ApiTags('news')
@Controller('api/v1/news')
export class NewsApiController {
  public constructor(private readonly newsService: NewsService) {}

  @Post('search')
  @ApiOperation({ summary: 'Search news' })
  @ZodResponse({
    status: 200,
    description: 'Paged news results',
    type: PageNewsDto,
  })
  public async search(
    @Body() body: NewsSearchBodyDto,
  ): Promise<PageNewsResponse> {
    const page = await this.newsService.search(newsSearchBodyToQuery(body));
    return pageNewsToResponse(page);
  }
}
