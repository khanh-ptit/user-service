export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
};
export type PaginationResult<T = any> = {
  items: T[];
  meta: PaginationMeta;
};
