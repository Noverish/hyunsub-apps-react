import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RsaKeyResult {
  publicKey: string;
}

export default async function rsaKey(): Promise<RsaKeyResult> {
  const config: AxiosRequestConfig<undefined> = {
    url: '/api/v1/rsa-key',
    method: 'GET',
  }

  const res: AxiosResponse<RsaKeyResult> = await axios(config)
  return res.data;
}
