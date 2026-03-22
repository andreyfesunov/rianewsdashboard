import type { z } from 'zod';

import { newsSearchBodySchema } from '@/news/presentation/schemas/news.schemas';

export type NewsSearchBody = z.infer<typeof newsSearchBodySchema>;
