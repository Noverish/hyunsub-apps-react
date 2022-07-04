import { generateNoParamApi } from "../generate-api";

export interface LogoutResult {
  success: boolean;
}

const logout = generateNoParamApi<LogoutResult>(() => ({
  url: '/api/v1/logout',
  method: 'POST',
}));

export default logout;
