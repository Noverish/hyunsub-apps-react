import { generateApi } from "src/api/generate-api";

export interface RsaKeyResult {
  publicKey: string;
}

const rsaKey = generateApi<{}, RsaKeyResult>(() => ({
  url: '/api/v1/auth/rsa-key',
  method: 'GET',
}));

export default rsaKey;
