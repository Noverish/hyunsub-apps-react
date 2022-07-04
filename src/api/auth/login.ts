import { generateApi } from "../generate-api";

export interface LoginParams {
  username: string;
  password: string;
  remember: boolean;
  captcha?: string;
}

export interface LoginResult {
  idNo: string;
}

export interface LoginError {
  needCaptcha: boolean;
}

const login = generateApi<LoginParams, LoginResult>(params => ({
  url: '/api/v1/login',
  method: 'POST',
  data: params,
}));

export default login;
