import { generateApi } from "../../generate-api";

export interface RegisterParams {
  username: string;
  password: string;
}

export interface RegisterResult {
  idNo: string;
}

const register = generateApi<RegisterParams, RegisterResult>(params => ({
  url: '/api/v1/auth/register',
  method: 'POST',
  data: params,
}));

export default register;
