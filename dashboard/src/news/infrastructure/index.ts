import { NewsRepository } from '../domain/repositories/news.repository';
import { ExporterClient } from './clients/exporter.client';
import { NewsRepositoryImpl } from './repositories/news.repository';

export const infrastructure = [
  { provide: NewsRepository, useClass: NewsRepositoryImpl },
  ExporterClient,
];
