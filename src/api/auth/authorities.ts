import { generateNoParamQuery } from "src/api/generate-api";

// TODO 뭔가 더 깔끔하게
const url = window.location.host.includes('auth')
  ? ''
  : `https://auth.hyunsub.kim`;

const getAuthorities = generateNoParamQuery<string[]>({
  api: () => ({
    url: url + '/api/v1/user/authorities',
    method: 'GET',
    withCredentials: true,
  }),
  key: () => ['authorities'],
});

export default getAuthorities;

export function useIsAdmin(): boolean {
  const authorities = getAuthorities.useApi();
  return authorities.includes('admin');
}
