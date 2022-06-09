import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface LoginParams {
  username: string;
  password: string;
  remember: boolean;
}

export interface LoginResult {
  idNo: string;
}

export default async function login(params: LoginParams): Promise<LoginResult> {
  const config: AxiosRequestConfig<LoginParams> = {
    url: '/api/v1/login',
    method: 'POST',
    data: params,
  }

  const res: AxiosResponse<LoginResult> = await axios(config)
  return res.data;
}
