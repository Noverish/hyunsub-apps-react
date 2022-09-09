import { generateNoParamApi } from "src/api/generate-api";

const signOut = generateNoParamApi<any>(() => ({
  url: '/api/v1/sign-out',
  method: 'POST',
}));

export default signOut;
