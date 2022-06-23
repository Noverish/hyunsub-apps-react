import { generateNoParamApi } from "../generate-api";

export interface MyPageUserInfo {
  username: string;
  historyNum: number;
  deviceNum: number;
}

const getMyPageUserInfo = generateNoParamApi<MyPageUserInfo>(() => ({
  url: '/api/v1/user/my-page',
  method: 'GET',
}));

export default getMyPageUserInfo;
