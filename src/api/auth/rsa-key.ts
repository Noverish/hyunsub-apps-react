import { generateNoParamApi } from "../generate-api";

export interface RsaKeyResult {
  publicKey: string;
}

const rsaKey = generateNoParamApi<RsaKeyResult>(() => ({
  url: '/api/v1/rsa-key',
  method: 'GET',
}));

export default rsaKey;
