import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RegisterParams {
  username: string;
  password: string;
}

export interface RegisterResult {
  idNo: string;
}

export default async function register(params: RegisterParams): Promise<RegisterResult> {
  const config: AxiosRequestConfig<RegisterParams> = {
    url: '/api/v1/register',
    method: 'POST',
    data: params,
  }

  const res: AxiosResponse<RegisterResult> = await axios(config)
  return res.data;
}
