import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import QueryClient from './query-client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import t from 'src/i18n';
import getErrMsg from 'src/i18n/server-error';
import { ErrorResponse } from 'src/model/api';
import { insertToast } from 'src/redux/toast';
import { isDev, sleep } from 'src/utils';
import { dispatch } from 'src/redux';

interface GenerateApiOption<P> {
  api: (p: P) => AxiosRequestConfig<P>;
  key: (p: P) => string[];
}

interface GenerateNoParamApiOption {
  api: () => AxiosRequestConfig;
  key: () => string[];
}

interface GenerateApiResult<P, R> {
  api: (p: P) => Promise<R>;
  key: (p: P) => string[];
  useApi: (p: P) => R;
  fetch: (p: P) => Promise<R>;
  cache: (p: P) => R | undefined;
  prefetch: (p: P) => void;
}

interface GenerateNoParamApiResult<R> {
  api: () => Promise<R>;
  key: () => string[];
  useApi: () => R;
  fetch: () => Promise<R>;
  cache: () => R | undefined;
  prefetch: () => void;
}

export function generateApiV2<P, R>(func: (p: P) => AxiosRequestConfig<P>) {
  return async (p: P): Promise<R> => {
    try {
      const res: AxiosResponse<R> = await axios(func(p));
      if (isDev()) {
        await sleep(1000);
      }
      return res.data;
    } catch (ex) {
      const res = (ex as AxiosError<ErrorResponse>).response!!;
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
  const key = option.key;
  const api = generateApiV2<P, R>(option.api);

  const useApi = (p: P) => useQuery(key(p), () => api(p)).data!!;
  const cache = (p: P) => QueryClient.getQueryData<R>(key(p));
  const fetch = (p: P) => QueryClient.fetchQuery(key(p), () => api(p), { staleTime: Infinity });
  const prefetch = (p: P) => QueryClient.prefetchQuery(key(p), () => api(p), { staleTime: Infinity });

  return {
    api,
    key,
    useApi,
    fetch,
    cache,
    prefetch,
  };
}

export function generateNoParamQuery<R>(option: GenerateNoParamApiOption): GenerateNoParamApiResult<R> {
  const key = option.key;
  const api = () => generateApiV2<any, R>(option.api)(undefined);

  const useApi = () => useQuery(key(), () => api()).data!!;
  const cache = () => QueryClient.getQueryData<R>(key());
  const fetch = () => QueryClient.fetchQuery(key(), () => api(), { staleTime: Infinity });
  const prefetch = () => QueryClient.prefetchQuery(key(), () => api(), { staleTime: Infinity });

  return {
    api,
    key,
    useApi,
    fetch,
    cache,
    prefetch,
  };
}
