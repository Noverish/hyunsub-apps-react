import { generateApi } from "src/api/generate-api";

export interface PutUserAuthorityParams {
  idNo: string;
  authorityId: number;
}

const putUserAuthority = generateApi<PutUserAuthorityParams, any>(params => ({
  url: '/api/v1/admin/users/authority',
  method: 'PUT',
  data: params,
}));

export default putUserAuthority;
