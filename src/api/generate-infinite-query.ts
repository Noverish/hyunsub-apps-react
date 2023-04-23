import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { PageData, Pagination } from 'src/model/api';
import { toJSON } from 'src/utils';
import QueryClient from 'src/api/query-client';
import { Draft, produce } from 'immer';
import { generateApi } from 'src/api/generate-api';
import { AxiosRequestConfig } from 'axios';

export interface PaginationParam {
  next?: string;
  prev?: string;
}

interface GenerateInfiniteApiOption<P> {
  api: (p: P & PaginationParam) => AxiosRequestConfig<P>;
  key: (p: P) => string;
}

interface GenerateInfiniteApiResult<P, R> {
  useInfiniteApi: (p: P) => UseInfiniteQueryResult<Pagination<R>> & { infiniteData: R[] };
  updateCache: (p: P, updater: (cache: R) => void) => void;
  insertToCache: (p: P, newItem: Draft<R>) => void;
  deleteFromCache: (p: P, predicate: (r: Draft<R>) => boolean) => void;
  key: (p: P) => string[];
}

export function generateInfiniteQuery2<P, R>(option: GenerateInfiniteApiOption<P>): GenerateInfiniteApiResult<P, R> {
  const key = (p: P) => [option.key(p), toJSON(p)];
  const api = generateApi<P & PaginationParam, Pagination<R>>(option.api);

  const useInfiniteApi = (p: P) => {
    const result = useInfiniteQuery(
      key(p),
      ({ pageParam }) => api({ ...p, ...pageParam }),
      {
        getNextPageParam: (lastPage) => lastPage.next ? ({ next: lastPage.next }) : undefined,
        getPreviousPageParam: (firstPage) => firstPage.prev ? ({ prev: firstPage.prev }) : undefined,
        staleTime: Infinity,
      }
    );

    const infiniteData = result.data?.pages.flatMap(v => v.data) ?? [];

    return { infiniteData, ...result };
  }

  const updateCache = (p: P, updater: (list: R) => void) => {
    QueryClient.setQueryData<InfiniteData<PageData<R>>>(key(p), (cache) => {
      cache?.pages.forEach((page) => {
        page.data.forEach(item => updater(item));
      });
      return cache;
    });
  }

  const insertToCache = (p: P, newItem: Draft<R>) => {
    QueryClient.setQueryData<InfiniteData<PageData<R>>>(
      key(p),
      (cache) => produce(cache, (draft) => {
        draft?.pages[0]?.data.unshift(newItem);
      }),
    )
  }

  const deleteFromCache = (p: P, predicate: (r: Draft<R>) => boolean) => {
    QueryClient.setQueryData<InfiniteData<PageData<R>>>(
      key(p),
      (cache) => {
        if (!cache) return cache;
        return produce(cache, (draft) => {
          for (const page of draft.pages) {
            page.data = page.data.filter(v => !predicate(v));
          }
        })
      },
    );
  }

  return {
    useInfiniteApi,
    updateCache,
    insertToCache,
    deleteFromCache,
    key,
  };
}
