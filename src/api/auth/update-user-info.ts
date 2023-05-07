import { generateApi } from 'src/api/generate-api';

export interface UpdateUserInfoParams {
  username?: string;
  password?: string;
}

export interface UpdateUserInfoResult {
  username?: boolean;
  password?: boolean;
}

const updateUserInfo = generateApi<UpdateUserInfoParams, UpdateUserInfoResult>((params) => ({
  url: '/api/v1/user',
  method: 'PUT',
  data: params,
}));

export default updateUserInfo;
