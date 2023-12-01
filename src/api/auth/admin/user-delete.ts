import { generateApi } from 'src/api/generate-api';

export interface UserDeleteParams {
  idNo: string;
}

const userDeleteApi = generateApi<UserDeleteParams, undefined>({
  api: (params: UserDeleteParams) => ({
    url: `/api/v1/admin/users/${params.idNo}`,
    method: 'DELETE',
  }),
});

export default userDeleteApi;
