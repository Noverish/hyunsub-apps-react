import { useQuery } from '@tanstack/react-query';
import * as jose from 'jose';
import Cookie from 'js-cookie';

import AppConstant from '../utils/constants';

export interface TokenPayload {
  idNo: string;
  username: string;
  authorities: string[];
  isAdmin: boolean;
  lang?: string;
}

async function loadTokenPayload(): Promise<TokenPayload> {
  const algorithm = 'ES512';

  const token = Cookie.get(AppConstant.TOKEN_COOKIE_NAME);
  if (!token) {
    throw new Error('401 Unauthorized - There is no token');
  }

  const key = await jose.importSPKI(AppConstant.TOKEN_PUBLIC_KEY, algorithm);
  const result = await jose.jwtVerify(token, key);
  const json = result.payload[AppConstant.TOKEN_PAYLOAD_FIELD] as string;
  const payload = JSON.parse(json) as TokenPayload;
  payload.isAdmin = payload.authorities.includes('admin');
  return payload;
}

export function useTokenPayload(): TokenPayload {
  return useQuery({
    queryKey: ['useTokenPayload'],
    queryFn: loadTokenPayload,
    staleTime: Infinity,
    suspense: true,
  }).data!!;
}

export function useIsAdmin() {
  return useTokenPayload().isAdmin;
}

export function useWeekday(date: Date): string {
  const { lang } = useTokenPayload();
  return date.toLocaleString(lang ?? 'ko', { weekday: 'short' });
}
