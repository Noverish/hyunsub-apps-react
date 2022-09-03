import { generateNoParamApi } from "../generate-api";

// TODO 뭔가 더 깔끔하게
const url = window.location.host.includes('auth')
  ? ''
  : `https://auth.hyunsub.kim`;

export interface LogoutResult {
  success: boolean;
}

const logout = generateNoParamApi<LogoutResult>(() => ({
  url: url + '/api/v1/logout',
  method: 'POST',
  withCredentials: true,
}));

export default logout;
