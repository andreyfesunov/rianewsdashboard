import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const tagSuggestBodySchema = z
  .object({
    page: z
      .int()
      .min(1)
      .optional()
      .default(1)
      .meta({ example: 1 })
      .describe('Suggestion page index; defaults to 1'),
    query: z
      .string()
      .optional()
      .default('')
      .meta({ example: 'politics' })
      .describe('Prefix to match tag labels'),
  })
  .meta({
    id: 'TagSuggestBody',
    title: 'Tag suggest request body',
    example: {
      page: 1,
      query: 'politics',
    },
  });

export const tagSuggestionItemSchema = z
  .object({
    value: z
      .string()
      .meta({ example: '18445' })
      .describe('Tag identifier (stable id)'),
    label: z
      .string()
      .meta({ example: 'Politics' })
      .describe('Human-readable label'),
  })
  .meta({
    id: 'TagSuggestionItem',
    title: 'Tag suggestion',
    example: { value: '18445', label: 'Politics' },
  });

export type TagSuggestionResponse = z.output<typeof tagSuggestionItemSchema>;

export const tagSuggestionItemListSchema = z
  .array(tagSuggestionItemSchema)
  .readonly()
  .meta({
    id: 'TagSuggestionItemList',
    title: 'Tag suggestions',
    example: [
      { value: '18445', label: 'Politics' },
      { value: '9012', label: 'Economy' },
    ],
  });

export class TagSuggestionItemListDto extends createZodDto(
  tagSuggestionItemListSchema,
) {}

export type ReadonlyTagSuggestionItemListDto = z.output<
  typeof tagSuggestionItemListSchema
>;

export class TagSuggestBodyDto extends createZodDto(tagSuggestBodySchema) {}

export class TagSuggestionItemDto extends createZodDto(
  tagSuggestionItemSchema,
) {}
