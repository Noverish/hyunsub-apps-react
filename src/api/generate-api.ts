import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import t from 'src/i18n';
import getErrMsg from "src/i18n/server-error";
import { ErrorResponse } from "src/model/api";
import { insertToast } from "src/redux/toast";
import { isDev, sleep } from "src/utils";

export function generateApi<Params, Result>(func: (params: Params) => AxiosRequestConfig<Params>) {
  return async (params: Params, dispatch?: Dispatch): Promise<Result> => {
    try {
      const res: AxiosResponse<Result> = await axios(func(params));
      if (isDev()) {
        await sleep(1000);
      }
      return res.data;
    } catch (ex) {
      const res = (ex as AxiosError<ErrorResponse>).response!!;
      if (res.status === 400) {
        dispatch?.(insertToast(getErrMsg(t, res.data)));
      } else if (res.status === 401) {
        window.location.href = `/login?url=${encodeURIComponent(window.location.href)}`;
      } else {
        dispatch?.(insertToast(JSON.stringify(res.data)));
      }
      throw ex;
    }
  }
}

export function generateNoParamApi<Result>(func: () => AxiosRequestConfig<undefined>) {
  return async (dispatch?: Dispatch): Promise<Result> => {
    try {
      const res: AxiosResponse<Result> = await axios(func());
      if (isDev()) {
        await sleep(1000);
      }
      return res.data;
    } catch (ex) {
      const res = (ex as AxiosError<ErrorResponse>).response!!;
      if (res.status === 401) {
        window.location.href = `/login?url=${encodeURIComponent(window.location.href)}`;
      } else {
        dispatch?.(insertToast(JSON.stringify(res.data)));
      }
      throw ex;
    }
  }
}
