import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { TFunction } from "i18next";
import getErrMsg from "src/i18n/server-error";
import { ErrorResponse } from "src/model/api";
import { insertToast } from "src/redux/toast";

export function generateApi<Params, Result>(func: (params: Params) => AxiosRequestConfig<Params>) {
  return async (params: Params, dispatch?: Dispatch, t?: TFunction): Promise<Result> => {
    try {
      const res: AxiosResponse<Result> = await axios(func(params));
      return res.data;
    } catch (ex) {
      const res = (ex as AxiosError<ErrorResponse>).response!!;
      if (res.status === 400 && t) {
        dispatch?.(insertToast(getErrMsg(t, res.data)));
      } else if (res.status === 401) {
        window.location.href = `/login?url=${encodeURIComponent(window.location.href)}`;
      } else {
        dispatch?.(insertToast(JSON.stringify(res.data)));
      }
      throw res.data;
    }
  }
}

export function generateNoParamApi<Result>(func: () => AxiosRequestConfig<undefined>) {
  return async (dispatch?: Dispatch): Promise<Result> => {
    try {
      const res: AxiosResponse<Result> = await axios(func());
      return res.data;
    } catch (ex) {
      const res = (ex as AxiosError<ErrorResponse>).response!!;
      if (res.status === 401) {
        window.location.href = `/login?url=${encodeURIComponent(window.location.href)}`;
      } else {
        dispatch?.(insertToast(JSON.stringify(res.data)));
      }
      throw res.data;
    }
  }
}
