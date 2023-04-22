import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { t } from 'i18next';
import getErrMsg from 'src/i18n/server-error';
import { ErrorResponse, PageData } from 'src/model/api';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { insertToast } from 'src/redux/toast';
import { isDev, sleep, toJSON } from 'src/utils';
import QueryClient from './query-client';
import { useEffect } from 'react';
import { produce } from 'immer';

interface GenerateApiOption<P> {
  api: (p: P) => AxiosRequestConfig<P>;
  key: (p: P) => string;
}

interface GenerateInfiniteApiOption<P> {
  api: (p: P & PageParam) => AxiosRequestConfig<P>;
  key: (p: P) => string;
}

interface GenerateApiResult<P, R> {
  api: (p: P) => Promise<R>;
  key: (p: P) => string[];
  useApi: (p: P) => R;
  useApiResult: (p: P) => UseQueryResult<R, unknown>;
  fetch: (p: P) => Promise<R>;
  cache: (p: P) => R | undefined;
  prefetch: (p: P) => void;
  invalidate: (p: P) => void;
  updateCache: (p: P, updater: (cache: R) => void) => void;
}

interface GenerateInfiniteApiResult<P, R> {
  useInfiniteApi: (p: P, initialData?: PageData<R>) => UseInfiniteQueryResult<PageData<R>> & { infiniteData: R[] };
  updateCache: (p: P, updater: (list: R[]) => R[]) => void;
  updateCache2: (p: P, updater: (cache: R) => void) => void;
  insertToCache: (p: P, newItem: R) => void;
  key: (p: P) => string[];
}

interface PageParam {
  page?: number;
}

export function generateApi<P, R>(func: (p: P) => AxiosRequestConfig) {
  return async (p: P): Promise<R> => {
    try {
      const res: AxiosResponse<R> = await axios(func(p));
      if (isDev()) {
        await sleep(1000);
      }
      return res.data;
    } catch (ex) {
      const res = (ex as AxiosError<ErrorResponse>).response!!;
      dispatch(GlobalActions.update({ loading: false }));
      if (res.status === 400) {
        dispatch(insertToast(getErrMsg(t, res.data)));
      } else if (res.status === 401) {
        window.location.href = `/login?url=${encodeURIComponent(window.location.href)}`;
      } else if (res.status === 403) {
        router.navigate('/forbidden');
      } else {
        dispatch(insertToast(JSON.stringify(res.data)));
      }
      throw ex;
    }
  }
}

export function generateQuery<P, R>(option: GenerateApiOption<P>): GenerateApiResult<P, R> {
  const key = (p: P) => [option.key(p), toJSON(p)];
  const api = generateApi<P, R>(option.api);

  const useApi = (p: P) => useQuery(key(p), () => api(p), { staleTime: Infinity }).data!!;
  const useApiResult = (p: P) => useQuery(key(p), () => api(p), { staleTime: Infinity, suspense: false });
  const cache = (p: P) => QueryClient.getQueryData<R>(key(p));
  const prefetch = (p: P) => QueryClient.prefetchQuery(key(p), () => api(p), { staleTime: Infinity });
  const fetch = (p: P) => QueryClient.fetchQuery(key(p), () => api(p), { staleTime: Infinity });
  const invalidate = (p: P) => QueryClient.invalidateQueries(key(p), { refetchType: 'active' });
  const updateCache = (p: P, updater: (cache: R) => void) => {
    QueryClient.setQueryData<R>(key(p), (cache) => {
      if (!cache) {
        return cache;
      }
      updater(cache);
      return cache;
    });
  }

  return {
    api,
    key,
    useApi,
    useApiResult,
    fetch,
    cache,
    prefetch,
    invalidate,
    updateCache,
  };
}

export function generateInfiniteQuery<P, R>(option: GenerateInfiniteApiOption<P>): GenerateInfiniteApiResult<P, R> {
  const key = (p: P) => [option.key(p), toJSON(p)];
  const api = generateApi<P & PageParam, PageData<R>>(option.api);

  const useInfiniteApi = (p: P, initialData?: PageData<R>) => {
    const initialData2 = initialData
      ? { pageParams: [initialData.page], pages: [initialData] }
      : undefined

    const result = useInfiniteQuery(
      key(p),
      ({ pageParam }) => api({ ...p, page: pageParam }),
      {
        getNextPageParam: (lastPage) => (lastPage.total <= (lastPage.page + 1) * lastPage.pageSize) ? undefined : (lastPage.page + 1),
        staleTime: Infinity,
        initialData: initialData2
      }
    );

    const data = result.data

    useEffect(() => {
      QueryClient.setQueryData<InfiniteData<PageData<R>>>(
        key(p),
        (cache) => produce(cache, (draft) => {
          if (!draft) return;
          const { pages, pageParams } = draft;

          for (let i = 0; i < pages.length; i++) {
            pageParams[i] = pages[i].page;
          }
        }),
      );
    }, [data]);

    const infiniteData = result.data?.pages.flatMap(v => v.data) ?? [];

    return { infiniteData, ...result };
  }

  const updateCache = (p: P, updater: (list: R[]) => R[]) => {
    QueryClient.setQueryData<InfiniteData<PageData<R>>>(key(p), (cache) => {
      if (!cache) {
        return undefined;
      }

      return {
        ...cache,
        pages: cache.pages.map((data) => ({
          ...data,
          data: updater(data.data),
        })),
      }
    });
  }

  const updateCache2 = (p: P, updater: (list: R) => void) => {
    QueryClient.setQueryData<InfiniteData<PageData<R>>>(key(p), (cache) => {
      cache?.pages.forEach((page) => {
        page.data.forEach(item => updater(item));
      });
      return cache;
    });
  }

  const insertToCache = (p: P, newItem: R) => {
    QueryClient.setQueryData<InfiniteData<PageData<R>>>(key(p), (cache) => {
      cache?.pages[0]?.data.splice(0, 0, newItem);
      return cache;
    });
  }

  return {
    useInfiniteApi,
    updateCache,
    updateCache2,
    insertToCache,
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
