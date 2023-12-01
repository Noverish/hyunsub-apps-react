import { InfiniteData, QueryKey, UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';

import { generateApi } from 'src/api/generate-api';
import { Pagination } from 'src/model/api';

interface PageParam {
  next?: string;
  prev?: string;
}

interface GenerateInfiniteApiOption<P> {
  api: (p: P & PageParam) => AxiosRequestConfig<P & PageParam>;
  key: string;
}

interface GenerateInfiniteApiResult<P, R> {
  useInfiniteApi: (p: P) => UseInfiniteQueryResult<Pagination<R>>;
}

export function generatePaginationQuery<P, R>(option: GenerateInfiniteApiOption<P>): GenerateInfiniteApiResult<P, R> {
  const key = (p: P): QueryKey => [option.key, p];
  const api = generateApi<P & PageParam, Pagination<R>>({ api: option.api });

  const useInfiniteApi = (p: P) => {
    return useInfiniteQuery({
      queryKey: key(p),
      queryFn: ({ pageParam }) => api({ ...p, ...pageParam }),
      getNextPageParam: (lastPage) => (lastPage.next ? { next: lastPage.next } : undefined),
      getPreviousPageParam: (firstPage) => (firstPage.prev ? { prev: firstPage.prev } : undefined),
      staleTime: Infinity,
      suspense: false,
    });
  };

  return {
    useInfiniteApi,
  };
}

export function useFlattenPagination<T>(data: InfiniteData<Pagination<T>> | undefined): T[] {
  return useMemo(() => data?.pages.flatMap((v) => v.data) ?? [], [data]);
}