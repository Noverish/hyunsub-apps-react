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

export interface MergedPageData<T> {
  total: number;
  pageSize: number;
  data: (T | null)[];
}

export interface Pagination<T> {
  total: number;
  prev: string | null;
  next: string | null;
  data: T[];
}

export interface SearchStatus {
  total: number;
  nowPage: number;
  totalPage: number;
}

export interface SearchResult<T> {
  data?: T[];
  status?: SearchStatus;
}

export interface SimpleResponse {
  result: string;
}

export interface DateRange {
  start: string;
  end: string;
}
