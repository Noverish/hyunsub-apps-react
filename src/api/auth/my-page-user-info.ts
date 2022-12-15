import { generateApi } from "src/api/generate-api";

export interface MyPageUserInfo {
  username: string;
  historyNum: number;
  deviceNum: number;
}

const getMyPageUserInfo = generateApi<{}, MyPageUserInfo>(() => ({
  url: '/api/v1/user/my-page',
  method: 'GET',
}));

export default getMyPageUserInfo;
