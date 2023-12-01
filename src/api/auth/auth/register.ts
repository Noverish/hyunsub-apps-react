import { generateApi } from 'src/api/generate-api';

export interface RegisterParams {
  username: string;
  password: string;
  captcha: string | null;
}

export interface RegisterResult {
  idNo: string;
}

const register = generateApi<RegisterParams, RegisterResult>({
  api: (params) => ({
    url: '/api/v1/auth/register',
    method: 'POST',
    data: params,
  }),
});

export default register;
