import { generateApi } from "../generate-api";

export interface LoginParams {
  username: string;
  password: string;
  remember: boolean;
}

export interface LoginResult {
  idNo: string;
}

const login = generateApi<LoginParams, LoginResult>(params => ({
  url: '/api/v1/login',
  method: 'POST',
  data: params,
}));

export default login;
