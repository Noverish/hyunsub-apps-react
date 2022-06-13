import { request } from "../request";

export interface MyPageUserInfo {
  username: string;
  historyNum: number;
  deviceNum: number;
}

export default function getMyPageUserInfo(): Promise<MyPageUserInfo> {
  return request({
    url: '/api/v1/user/my-page',
    method: 'GET',
  });
}
