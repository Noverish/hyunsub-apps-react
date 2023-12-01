import { generateApi } from 'src/api/generate-api';

export interface LoginParams {
  username: string;
  password: string;
  remember: boolean;
  captcha: string | null;
}

export interface LoginResult {
  idNo: string;
}

export interface LoginError {
  needCaptcha: boolean;
}

const login = generateApi<LoginParams, LoginResult>({
  api: (params) => ({
    url: '/api/v1/auth/login',
    method: 'POST',
    data: params,
  }),
});

export default login;
