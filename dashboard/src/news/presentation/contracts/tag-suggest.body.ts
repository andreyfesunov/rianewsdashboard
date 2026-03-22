import type { z } from 'zod';

import { tagSuggestBodySchema } from '@/news/presentation/schemas/tags.schemas';

export type TagSuggestBody = z.infer<typeof tagSuggestBodySchema>;
