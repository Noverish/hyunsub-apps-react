import { InfiniteData, UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { Draft, produce } from 'immer';

import { generateApi } from 'src/api/generate-api';
import QueryClient from 'src/api/query-client';
import { PageData } from 'src/model/api';
import { toJSON } from 'src/utils';

export type UseInfQueryResult<R> = UseInfiniteQueryResult<PageData<R>> & { infiniteData: R[] };

interface PageParam {
  page?: number;
}

interface GenerateInfiniteApiOption<P> {
  api: (p: P & PageParam) => AxiosRequestConfig<P>;
  key: (p: P) => string;
}

interface GenerateInfiniteApiResult<P, R> {
  useInfiniteApi: (p: P, initialData?: PageData<R>) => UseInfQueryResult<R>;
  updateCache: (p: P, updater: (cache: Draft<R>) => void) => void;
  insertCache: (p: P, newItem: Draft<R>) => void;
  deleteCache: (p: P, predicate: (r: Draft<R>) => boolean) => void;
  key: (p: P) => string[];
}

export function generateInfiniteQuery<P, R>(
  option: GenerateInfiniteApiOption<P>
): GenerateInfiniteApiResult<P, R> {
  const key = (p: P) => [option.key(p), toJSON(p)];
  const api = generateApi<P & PageParam, PageData<R>>(option.api);

  const useInfiniteApi = (p: P, initialData?: PageData<R>) => {
    const initialData2 = initialData
      ? { pageParams: [initialData.page], pages: [initialData] }
      : undefined;

    const result = useInfiniteQuery(key(p), ({ pageParam }) => api({ ...p, page: pageParam }), {
      getNextPageParam: (lastPage) =>
        lastPage.total <= (lastPage.page + 1) * lastPage.pageSize ? undefined : lastPage.page + 1,
      staleTime: Infinity,
      initialData: initialData2,
    });

    const infiniteData = result.data?.pages.flatMap((v) => v.data) ?? [];

    return { infiniteData, ...result };
  };

  const updateCache = (p: P, updater: (cache: Draft<R>) => void) => {
    QueryClient.setQueryData<InfiniteData<PageData<R>>>(key(p), (cache) => {
      if (!cache) return cache;
      return produce(cache, (draft) => {
        for (const page of draft.pages) {
          page.data.forEach((v) => updater(v));
        }
      });
    });
  };

  const insertCache = (p: P, newItem: Draft<R>) => {
    QueryClient.setQueryData<InfiniteData<PageData<R>>>(key(p), (cache) => {
      if (!cache) return cache;
      return produce(cache, (draft) => {
        draft.pages[0]?.data.unshift(newItem);
      });
    });
  };

  const deleteCache = (p: P, predicate: (r: Draft<R>) => boolean) => {
    QueryClient.setQueryData<InfiniteData<PageData<R>>>(key(p), (cache) => {
      if (!cache) return cache;
      return produce(cache, (draft) => {
        for (const page of draft.pages) {
          page.data = page.data.filter((v) => !predicate(v));
        }
      });
    });
  };

  return {
    useInfiniteApi,
    updateCache,
    insertCache,
    deleteCache,
    key,
  };
}

export function flatInfiniteData<T>(data: InfiniteData<PageData<T>>): (T | null)[] {
  if (data.pages.length === 0) {
    return [];
  }

  const { total } = data.pages[0];
  const result = Array.from({ length: total }, () => null as T | null);

  for (const dataList of data.pages) {
    const { page, pageSize, data } = dataList;
    const start = page * pageSize;

    for (let i = 0; i < data.length; i++) {
      result[i + start] = data[i];
    }
  }

  return result;
}
