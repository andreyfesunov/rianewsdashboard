import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const tagsFromQuery = z.preprocess((val: unknown): readonly string[] => {
  if (val === undefined || val === null || val === '') return [];
  const arr = Array.isArray(val) ? val : [val];
  return arr.map((s) => String(s).trim()).filter((s) => s.length > 0);
}, z.array(z.string()));

export const newsDashboardQuerySchema = z.object({
  q: z.preprocess((v: unknown) => {
    if (v === undefined || v === null) return '';
    if (typeof v === 'string') return v.trim();
    if (typeof v === 'number' && Number.isFinite(v)) return String(v);
    return '';
  }, z.string()),
  page: z.preprocess((v: unknown) => {
    if (v === undefined || v === null || v === '') return 1;
    if (typeof v === 'number' && Number.isFinite(v)) {
      const n = Math.trunc(v);
      return n >= 1 ? n : 1;
    }
    if (typeof v !== 'string') return 1;
    const n = Number.parseInt(v, 10);
    return Number.isFinite(n) && n >= 1 ? n : 1;
  }, z.number().int()),
  tags: tagsFromQuery,
});

export type NewsDashboardQuery = z.infer<typeof newsDashboardQuerySchema>;

export class NewsDashboardQueryDto extends createZodDto(
  newsDashboardQuerySchema,
) {}
