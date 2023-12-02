import { InfiniteData, QueryKey, UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { Draft, produce } from 'immer';
import { UseInfiniteQueryOptions } from 'node_modules/@tanstack/react-query/build/lib/types';
import { useMemo } from 'react';

import { generateApi } from 'src/api/generate-api';
import QueryClient from 'src/api/query-client';
import { MergedPageData, PageData } from 'src/model/api';

interface PageParam {
  page?: number;
}

interface GenerateInfiniteApiOption<P> {
  api: (p: P & PageParam) => AxiosRequestConfig<P & PageParam>;
  key: string;
}

interface GenerateInfiniteApiResult<P, R> {
  useInfiniteApi: (
    p: P,
    option?: UseInfiniteQueryOptions<PageData<R>, unknown, PageData<R>, PageData<R>, QueryKey>,
  ) => UseInfiniteQueryResult<PageData<R>>;
  updateCache: (p: P, updater: (cache: Draft<R>) => void) => void;
  insertCache: (p: P, newItem: Draft<R>) => void;
  deleteCache: (p: P | null, predicate: (r: Draft<R>) => boolean) => void;
  invalidate: (p?: P) => void;
  clearCache: (p?: P) => void;
  key: (p: P) => QueryKey;
}

export function generateInfiniteQuery<P, R>(option: GenerateInfiniteApiOption<P>): GenerateInfiniteApiResult<P, R> {
  type TQueryFnData = InfiniteData<PageData<R>>;

  const key = (p: P): QueryKey => [option.key, p];
  const api = generateApi<P & PageParam, PageData<R>>({ api: option.api });

  const useInfiniteApi = (
    p: P,
    option?: UseInfiniteQueryOptions<PageData<R>, unknown, PageData<R>, PageData<R>, QueryKey>,
  ) => {
    const getNextPageParam = (lastPage: PageData<R>) => {
      return lastPage.total <= (lastPage.page + 1) * lastPage.pageSize ? undefined : lastPage.page + 1;
    };

    return useInfiniteQuery({
      queryKey: key(p),
      queryFn: ({ pageParam }) => api({ ...p, page: pageParam }),
      getNextPageParam,
      staleTime: Infinity,
      ...option,
    });
  };

  const updateCache = (p: P, updater: (cache: Draft<R>) => void) => {
    QueryClient.setQueryData<TQueryFnData>(key(p), (cache) => {
      if (!cache) return cache;
      return produce(cache, (draft) => {
        for (const page of draft.pages) {
          page.data.forEach((v) => updater(v));
        }
      });
    });
  };

  const insertCache = (p: P, newItem: Draft<R>) => {
    QueryClient.setQueryData<TQueryFnData>(key(p), (cache) => {
      if (!cache) return cache;
      return produce(cache, (draft) => {
        draft.pages[0]?.data.unshift(newItem);
      });
    });
  };

  const deleteCache = (p: P | null, predicate: (r: Draft<R>) => boolean) => {
    const queryKey: QueryKey = p ? key(p) : [option.key];

    QueryClient.setQueriesData<TQueryFnData>(queryKey, (cache) => {
      if (!cache) return cache;
      return produce(cache, (draft) => {
        for (const page of draft.pages) {
          page.data = page.data.filter((v) => !predicate(v));
        }
      });
    });
  };

  const clearCache = (p?: P) => {
    const queryKey: QueryKey = p ? key(p) : [option.key];
    QueryClient.removeQueries(queryKey);
  };

  const invalidate = (p?: P) => {
    const queryKey: QueryKey = p ? key(p) : [option.key];
    QueryClient.invalidateQueries<TQueryFnData>(queryKey);
  };

  return {
    useInfiniteApi,
    updateCache,
    insertCache,
    deleteCache,
    clearCache,
    invalidate,
    key,
  };
}

function getMergedPageData<T>(infiniteData: InfiniteData<PageData<T>> | undefined): MergedPageData<T> | undefined {
  if (!infiniteData) {
    return undefined;
  }

  const firstData = infiniteData.pages[0];
  if (!firstData) {
    return undefined;
  }

  const total = firstData.total;
  const pageSize = firstData.pageSize;
  const data: (T | null)[] = Array.from({ length: total }, () => null);
  for (const pageData of infiniteData.pages) {
    const start = pageData.page * pageSize;
    pageData.data.forEach((v, i) => {
      data[start + i] = v;
    });
  }

  return { total, pageSize, data };
}

export function useMergedPageData<T>(data: InfiniteData<PageData<T>> | undefined): MergedPageData<T> | undefined {
  return useMemo(() => getMergedPageData(data), [data]);
}

export function useFlattenPageData<T>(data: InfiniteData<PageData<T>> | undefined): T[] {
  return useMemo(() => data?.pages.flatMap((v) => v.data) ?? [], [data]);
}
