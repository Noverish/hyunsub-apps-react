import * as jose from 'jose';
import Cookie from 'js-cookie';
import AppConstant from './constants';

export interface TokenPayload {
  idNo: string;
  username: string;
  authorities: string[];
  isAdmin: boolean;
}

export async function loadTokenPayload(): Promise<TokenPayload | undefined> {
  const algorithm = 'ES512';

  const token = Cookie.get(AppConstant.TOKEN_COOKIE_NAME)
  if (!token) {
    return undefined;
  }

  const key = await jose.importSPKI(AppConstant.TOKEN_PUBLIC_KEY, algorithm)
  const result = await jose.jwtVerify(token, key)
  const json = result.payload[AppConstant.TOKEN_PAYLOAD_FIELD] as string
  const payload = JSON.parse(json) as TokenPayload;
  payload.isAdmin = payload.authorities.includes('admin');
  return payload;
}
