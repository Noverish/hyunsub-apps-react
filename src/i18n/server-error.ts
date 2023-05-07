import { TFunction } from 'i18next';

import { ErrorResponse } from 'src/model/api';

const errorCodeMap: { [code: string]: string } = {
  1001: 'auth.errMsg.already-exist-id',
  1002: 'auth.errMsg.invalid-id-pw',
  2011: 'auth.errMsg.captcha-required',
};

export default function getErrMsg(t: TFunction, err: ErrorResponse): string {
  const tkey = errorCodeMap[err.code] as any;
  return tkey ? t(tkey) : JSON.stringify(err);
}
