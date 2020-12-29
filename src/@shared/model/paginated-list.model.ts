export interface PaginatedList<T> {
  readonly items: T[];
  readonly page: number;
  readonly pageSize: number;
  readonly pageCount: number;
  readonly totalItems: number;
}
