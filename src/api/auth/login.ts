import { request } from "../request";

export interface LoginParams {
  username: string;
  password: string;
  remember: boolean;
}

export interface LoginResult {
  idNo: string;
}

export default function login(params: LoginParams): Promise<LoginResult> {
  return request({
    url: '/api/v1/login',
    method: 'POST',
    data: params,
  });
}
