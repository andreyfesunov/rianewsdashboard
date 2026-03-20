export interface NewsQuery {
  readonly page: number;
  readonly query: string;
  readonly sort: readonly string[];
  readonly tags: readonly string[];
}
