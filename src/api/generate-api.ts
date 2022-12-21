import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import t from 'src/i18n';
import getErrMsg from 'src/i18n/server-error';
import { ErrorResponse, PageData } from 'src/model/api';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { insertToast } from 'src/redux/toast';
import { isDev, sleep, toJSON } from 'src/utils';
import QueryClient from './query-client';

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
  fetch: (p: P, force?: boolean) => Promise<R>;
  cache: (p: P) => R | undefined;
  prefetch: (p: P) => void;
}

interface GenerateInfiniteApiResult<P, R> {
  useInfiniteApi: (p: P) => UseInfiniteQueryResult<PageData<R>>;
  updateCache: (p: P, updater: (list: R[]) => R[]) => void;
}

interface PageParam {
  page: number;
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
  const fetch = (p: P, force?: boolean) => {
    const queryKey = key(p);
    if (force) {
      QueryClient.invalidateQueries({ queryKey, refetchType: 'none' });
    }
    return QueryClient.fetchQuery(queryKey, () => api(p), { staleTime: Infinity });
  };

  return {
    api,
    key,
    useApi,
    useApiResult,
    fetch,
    cache,
    prefetch,
  };
}

export function generateInfiniteQuery<P, R>(option: GenerateInfiniteApiOption<P>): GenerateInfiniteApiResult<P, R> {
  const key = (p: P) => [option.key(p), toJSON(p)];
  const api = generateApi<P & PageParam, PageData<R>>(option.api);

  const useInfiniteApi = (p: P) => useInfiniteQuery(
    key(p),
    ({ pageParam }) => api({ ...p, page: pageParam ?? 0 }),
    {
      getNextPageParam: (lastPage, pages) => (lastPage.data.length === 0) ? undefined : pages.length,
      staleTime: Infinity,
    }
  )
  const updateCache = (p: P, updater: (list: R[]) => R[]) => {
    QueryClient.setQueryData<InfiniteData<PageData<R>>>(key(p), (cache) => {
      if (!cache) {
        return cache;
      }

      return {
        ...cache,
        pages: cache.pages.map((data) => ({
          ...data,
          data: updater(data.data),
        })),
      }
    })
  }

  return {
    useInfiniteApi,
    updateCache,
  };
}
