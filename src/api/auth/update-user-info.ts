import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface UpdateUserInfoParams {
  username?: string;
  password?: string;
}

export interface UpdateUserInfoResult {
  username?: boolean;
  password?: boolean;
}

export default async function updateUserInfo(params: UpdateUserInfoParams): Promise<UpdateUserInfoResult> {
  const config: AxiosRequestConfig<UpdateUserInfoParams> = {
    url: '/api/v1/user',
    method: 'PUT',
    data: params,
  }

  const res: AxiosResponse<UpdateUserInfoResult> = await axios(config)
  return res.data;
}
