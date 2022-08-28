import { generateApiV2 } from "../../generate-api-v2";

export interface DelUserAuthorityParams {
  idNo: string;
  authorityId: number;
}

const delUserAuthority = generateApiV2<any, DelUserAuthorityParams>(params => ({
  url: '/api/v1/admin/users/authority',
  method: 'DELETE',
  data: params,
}));

export default delUserAuthority;
