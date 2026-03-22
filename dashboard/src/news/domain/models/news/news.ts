export interface News {
  readonly title: string;
  readonly url: string;
  readonly assets: readonly string[];
  readonly time: string;
  readonly views: number;
}
