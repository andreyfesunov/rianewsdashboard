import { NewsController } from './api/news.controller';
import { TagsController } from './api/tags.controller';
import { NewsMvcController } from './mvc/news.controller';

export const presentation = [NewsController, TagsController, NewsMvcController];
