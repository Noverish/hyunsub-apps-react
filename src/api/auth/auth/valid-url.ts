import { generateQuery } from "../../generate-api-v2";

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
  key: (params) => ['validUrl', params.url],
});

export default validUrl;