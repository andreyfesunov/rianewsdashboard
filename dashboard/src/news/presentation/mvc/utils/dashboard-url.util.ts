export function dashboardNewsUrl(
  q: string,
  page: number,
  tags: readonly string[],
): string {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  for (const t of tags) params.append('tags', t);
  if (page > 1) params.set('page', String(page));
  const s = params.toString();
  return s ? `/dashboard/news?${s}` : '/dashboard/news';
}
