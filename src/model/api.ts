export interface ErrorResponse {
  code: string;
  msg: string;
  payload: any;
}

export interface PageData<T> {
  total: number;
  page: number;
  pageSize: number;
  data: T[];
}
