import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface LogoutResult {
  success: boolean;
}

export default async function logout(): Promise<LogoutResult> {
  const config: AxiosRequestConfig<undefined> = {
    url: '/api/v1/logout',
    method: 'POST',
  }

  const res: AxiosResponse<LogoutResult> = await axios(config)
  return res.data;
}
