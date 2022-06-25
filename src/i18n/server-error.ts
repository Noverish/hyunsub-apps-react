import { TFunction } from "i18next";
import { DefaultResources, Normalize } from "react-i18next";
import { ErrorResponse } from "src/model/api";

const errorCodeMap: {[code: string]: Normalize<DefaultResources['translation']>} = {
  1001: 'auth.errMsg.already-exist-id',
  1002: 'auth.errMsg.invalid-id-pw',
  2011: 'auth.errMsg.captcha-required',
}

export default function getErrMsg(t: TFunction, err: ErrorResponse): string {
  const tkey = errorCodeMap[err.code];
  return tkey ? t(tkey) : JSON.stringify(err);
}
