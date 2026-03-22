import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const newsItemSchema = z
  .object({
    title: z.string().describe('Article title'),
    url: z.string().describe('Article URL'),
    assets: z.array(z.string()).describe('Media asset URLs'),
    time: z.string().describe('Publication time string from the source'),
    views: z.int().describe('View counter'),
  })
  .meta({ id: 'NewsItem', title: 'News item' });

export const pageNewsSchema = z
  .object({
    page: z.int().describe('Current page index (1-based)'),
    size: z.int().describe('Page size'),
    total: z.int().describe('Total number of items'),
    items: z.array(newsItemSchema).describe('Items on this page'),
  })
  .meta({
    id: 'PageNews',
    title: 'News search result page',
    example: {
      page: 1,
      size: 20,
      total: 42,
      items: [
        {
          title: 'Example headline',
          url: 'https://example.com/article',
          assets: [],
          time: '2025-01-01 12:00',
          views: 1000,
        },
      ],
    },
  });

export type PageNewsResponse = z.output<typeof pageNewsSchema>;

export const newsSearchBodySchema = z
  .object({
    page: z.int().min(1).meta({ example: 1 }).describe('Page number (1-based)'),
    query: z.string().meta({ example: 'economy' }).describe('Search query'),
    sort: z
      .array(z.string())
      .default(() => [])
      .meta({ example: [] as readonly string[] })
      .describe('Optional sort criteria'),
    tags: z
      .array(z.string())
      .default(() => [])
      .meta({ example: [] as readonly string[] })
      .describe('Tag identifiers for filtering'),
  })
  .meta({
    id: 'NewsSearchBody',
    title: 'News search request body',
    example: {
      page: 1,
      query: 'economy',
      sort: [],
      tags: [],
    },
  });

export class NewsSearchBodyDto extends createZodDto(newsSearchBodySchema) {}

export class PageNewsDto extends createZodDto(pageNewsSchema) {}
