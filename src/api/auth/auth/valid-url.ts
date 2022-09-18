import { generateQuery } from "src/api/generate-api";

export interface ValidUrlParams {
  url: string;
}

export interface ValidUrlResult {
  valid: boolean;
}

const validUrl = generateQuery<ValidUrlParams, ValidUrlResult>({
  api: (params) => ({
    url: '/api/v1/auth/valid-url',
    method: 'POST',
    data: params,
  }),
  key: () => 'validUrl',
});

export default validUrl;
