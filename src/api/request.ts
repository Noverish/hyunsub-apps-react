import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ErrorResponse } from "src/model/api";

export async function request<Params, Result>(config: AxiosRequestConfig<Params>): Promise<Result> {
  try {
    const res: AxiosResponse<Result> = await axios(config)
    return res.data;
  } catch (ex) {
    const res = (ex as AxiosError<ErrorResponse>).response!!;
    if (res.status === 401) {
      window.location.href=`/login?url=${encodeURIComponent(window.location.href)}`;
    }
    throw ex;
  }
}
