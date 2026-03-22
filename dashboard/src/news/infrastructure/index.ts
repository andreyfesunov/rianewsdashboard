import { NewsRepository } from '../domain/repositories/news.repository';
import { TagsRepository } from '../domain/repositories/tags.repository';
import { ExporterClient } from './clients/exporter.client';
import { NewsRepositoryImpl } from './repositories/news.repository';
import { TagsRepositoryImpl } from './repositories/tags.repository';

export const infrastructure = [
  { provide: NewsRepository, useClass: NewsRepositoryImpl },
  { provide: TagsRepository, useClass: TagsRepositoryImpl },
  ExporterClient,
];
