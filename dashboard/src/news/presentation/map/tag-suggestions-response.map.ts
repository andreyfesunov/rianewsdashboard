import { TagSuggestion } from '@/news/domain/models/tags/tags';
import type { TagSuggestionResponse } from '@/news/presentation/schemas/tags.schemas';

export function tagSuggestionsToResponse(
  items: readonly TagSuggestion[],
): readonly TagSuggestionResponse[] {
  return items.map((item) => ({
    value: item.value,
    label: item.label,
  }));
}
