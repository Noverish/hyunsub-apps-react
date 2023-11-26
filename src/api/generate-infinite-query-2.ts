import { InfiniteData, QueryKey, UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';

import { generateApi } from 'src/api/generate-api';
import { Pagination } from 'src/model/api';

export type UseInfQueryResult2<R> = UseInfiniteQueryResult<Pagination<R>>;

interface PageParam {
  next?: string;
  prev?: string;
}

interface GenerateInfiniteApiOption<P> {
  api: (p: P & PageParam) => AxiosRequestConfig<P>;
  key: string;
}

interface GenerateInfiniteApiResult<P, R> {
  useInfiniteApi: (p: P) => UseInfQueryResult2<R>;
}

export function generateInfiniteQuery2<P, R>(option: GenerateInfiniteApiOption<P>): GenerateInfiniteApiResult<P, R> {
  const key = (p: P): QueryKey => [option.key, p];
  const api = generateApi<P & PageParam, Pagination<R>>(option.api);

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

export function useFlattenPageData2<T>(data: InfiniteData<Pagination<T>> | undefined): T[] {
  return useMemo(() => data?.pages.flatMap((v) => v.data) ?? [], [data]);
}
