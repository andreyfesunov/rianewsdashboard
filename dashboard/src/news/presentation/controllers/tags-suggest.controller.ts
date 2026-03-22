import { TagsService } from '@/news/application/services/tags.service';
import { tagSuggestBodyToQuery } from '@/news/presentation/map/tag-suggest-body.map';
import { tagSuggestionsToResponse } from '@/news/presentation/map/tag-suggestions-response.map';
import {
  TagSuggestBodyDto,
  TagSuggestionItemListDto,
  type ReadonlyTagSuggestionItemListDto,
} from '@/news/presentation/schemas/tags.schemas';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZodResponse } from 'nestjs-zod';

@ApiTags('tags')
@Controller('api/v1/tags')
export class TagsSuggestController {
  public constructor(private readonly tagsService: TagsService) {}

  @Post('suggest')
  @ApiOperation({ summary: 'Suggest tags' })
  @ZodResponse({
    status: 200,
    description: 'Tag suggestions',
    type: TagSuggestionItemListDto,
  })
  public async suggest(
    @Body() body: TagSuggestBodyDto,
  ): Promise<ReadonlyTagSuggestionItemListDto> {
    const items = await this.tagsService.suggest(tagSuggestBodyToQuery(body));
    return tagSuggestionsToResponse(items);
  }
}
