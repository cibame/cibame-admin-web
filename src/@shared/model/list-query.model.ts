export interface ListQuery {
  readonly filter?: string;
  readonly page?: number;
  readonly pageSize?: number;
  readonly sort?: string;
  readonly sortOrder?: 'asc' | 'desc' | '';
}
