import { request } from "../request";

export interface LogoutResult {
  success: boolean;
}
export default function logout(): Promise<LogoutResult> {
  return request({
    url: '/api/v1/logout',
    method: 'POST',
  });
}
