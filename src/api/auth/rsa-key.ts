import { request } from "../request";

export interface RsaKeyResult {
  publicKey: string;
}

export default function rsaKey(): Promise<RsaKeyResult> {
  return request({
    url: '/api/v1/rsa-key',
    method: 'GET',
  });
}
