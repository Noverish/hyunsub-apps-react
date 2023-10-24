import { QueryKey, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { t } from 'i18next';
import { produce } from 'immer';

import QueryClient from './query-client';
import getErrMsg from 'src/i18n/server-error';
import { ErrorResponse } from 'src/model/api';
import router from 'src/pages/router';
import { dispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { insertToast } from 'src/redux/toast';
import { isDev, sleep } from 'src/utils';

export type Updater<R> = (cache: R) => R | void | undefined;

interface GenerateQueryOption<P> {
  api: (p: P) => AxiosRequestConfig<P>;
  key: string;
  host?: string;
}

interface GenerateApiResult<P, R> {
  api: (p: P) => Promise<R>;
  key: (p: P) => QueryKey;
  useApi: (p: P) => R;
  useApiResult: (p: P, option?: UseQueryOptions<R, unknown, R>) => UseQueryResult<R, unknown>;
  fetch: (p: P) => Promise<R>;
  cache: (p: P) => R | undefined;
  prefetch: (p: P) => void;
  invalidate: (p?: P) => void;
  setCache: (p: P, cache: R) => void;
  clearCache: (p?: P) => void;
  updateCache: (p: P, updater: Updater<R>) => void;
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
      dispatch(GlobalActions.update({ loading: false }));
      const res = (ex as AxiosError<ErrorResponse>).response!!;
      if (!res) {
        throw ex;
      }

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
  };
}

export function generateQuery<P, R>(option: GenerateQueryOption<P>): GenerateApiResult<P, R> {
  const key = (p: P): QueryKey => [option.key, p];

  const newOptionApi = (p: P): AxiosRequestConfig => {
    const config = option.api(p);

    const url = config.url;
    const host = option.host;
    if (url && host && !window.location.host.includes(host)) {
      config.url = `https://${host}.hyunsub.kim${url}`;
    }

    return config;
  };

  const api = generateApi<P, R>(newOptionApi);

  const useApi = (p: P) =>
    useQuery({
      queryKey: key(p),
      queryFn: () => api(p),
      staleTime: Infinity,
    }).data!!;

  const useApiResult = (p: P, option?: UseQueryOptions<R, unknown, R>) =>
    useQuery({
      queryKey: key(p),
      queryFn: () => api(p),
      staleTime: Infinity,
      suspense: false,
      ...option,
    });

  const cache = (p: P) => QueryClient.getQueryData<R>(key(p));
  const prefetch = (p: P) => QueryClient.prefetchQuery(key(p), () => api(p), { staleTime: Infinity });
  const fetch = (p: P) => QueryClient.fetchQuery(key(p), () => api(p), { staleTime: Infinity });

  const setCache = (p: P, cache: R) => QueryClient.setQueryData<R>(key(p), cache);

  const invalidate = (p?: P) => {
    const queryKey: QueryKey = p ? key(p) : [option.key];
    QueryClient.invalidateQueries(queryKey, { refetchType: 'active' });
  };

  const clearCache = (p?: P) => {
    const queryKey: QueryKey = p ? key(p) : [option.key];
    QueryClient.removeQueries(queryKey);
  };

  const updateCache = (p: P, updater: Updater<R>) => {
    QueryClient.setQueryData<R>(key(p), (cache) => (cache ? produce(cache, updater) : cache));
  };

  return {
    api,
    key,
    useApi,
    useApiResult,
    fetch,
    cache,
    prefetch,
    invalidate,
    setCache,
    clearCache,
    updateCache,
  };
}
