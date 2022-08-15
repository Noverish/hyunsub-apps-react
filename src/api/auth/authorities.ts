import { useQuery } from "react-query";
import { generateNoParamApi } from "../generate-api";

// TODO 뭔가 더 깔끔하게
const url = window.location.host.includes('auth')
  ? ''
  : `https://auth2.hyunsub.kim`;

const getAuthorities = generateNoParamApi<string[]>(() => ({
  url: url + '/api/v1/user/authorities',
  method: 'GET',
  withCredentials: true,
}));

export default getAuthorities;

export function useAuthorities(): string[] {
  return useQuery('authorities', () => getAuthorities()).data!!;
}

export function useIsAdmin(): boolean {
  const authorities = useAuthorities();
  return authorities.includes('admin');
}
