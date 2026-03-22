export interface Page<T> {
  readonly page: number;
  readonly size: number;
  readonly total: number;
  readonly items: readonly T[];
}
