import { generateApi } from 'src/api/generate-api';

export interface DelUserAuthorityParams {
  idNo: string;
  authorityId: number;
}

const userAuthorityDeleteApi = generateApi<any, DelUserAuthorityParams>((params) => ({
  url: '/api/v1/admin/users/authority',
  method: 'DELETE',
  data: params,
}));

export default userAuthorityDeleteApi;
