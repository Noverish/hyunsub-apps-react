import JSEncrypt from "jsencrypt";
import { CodeError, ErrorCode } from "./error-code";

export function encrypt(publicKey: string, plaintext: string): string {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);

  const result = encrypt.encrypt(plaintext);
  if (result !== false) {
    return result;
  }
  throw new CodeError(ErrorCode.JS_ENCRYPT_ERROR);
}
