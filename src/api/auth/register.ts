import { request } from "../request";

export interface RegisterParams {
  username: string;
  password: string;
}

export interface RegisterResult {
  idNo: string;
}

export default function register(params: RegisterParams): Promise<RegisterResult> {
  return request({
    url: '/api/v1/register',
    method: 'POST',
    data: params,
  });
}
