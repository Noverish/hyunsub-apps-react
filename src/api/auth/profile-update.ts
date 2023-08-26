import { generateApi } from 'src/api/generate-api';

export interface ProfileUpdateParams {
  username?: string;
  password?: string;
}

export interface ProfileUpdateResult {
  username?: boolean;
  password?: boolean;
}

const profileUpdateApi = generateApi<ProfileUpdateParams, ProfileUpdateResult>((params) => ({
  url: '/api/v1/profile',
  method: 'PUT',
  data: params,
}));

export default profileUpdateApi;
