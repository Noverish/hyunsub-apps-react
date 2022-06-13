import { request } from "../request";

export interface UpdateUserInfoParams {
  username?: string;
  password?: string;
}

export interface UpdateUserInfoResult {
  username?: boolean;
  password?: boolean;
}

export default function updateUserInfo(params: UpdateUserInfoParams): Promise<UpdateUserInfoResult> {
  return request({
    url: '/api/v1/user',
    method: 'PUT',
    data: params,
  });
}
