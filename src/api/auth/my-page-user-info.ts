import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface MyPageUserInfo {
  username: string;
  historyNum: number;
  deviceNum: number;
}

export default async function getMyPageUserInfo(): Promise<MyPageUserInfo> {
  const config: AxiosRequestConfig<undefined> = {
    url: '/api/v1/user/my-page',
    method: 'GET',
  }

  const res: AxiosResponse<MyPageUserInfo> = await axios(config)
  return res.data;
}
