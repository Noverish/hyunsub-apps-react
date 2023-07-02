import userListApi from './user-list';
import { generateApi } from 'src/api/generate-api';
import { AdminUser } from 'src/model/auth';

export interface UserDeleteParams {
  idNo: string;
}

const userDeleteApi = generateApi<UserDeleteParams, undefined>((params: UserDeleteParams) => ({
  url: `/api/v1/admin/users/${params.idNo}`,
  method: 'DELETE',
}));

export default userDeleteApi;

export function useUserDelete() {
  return async (params: UserDeleteParams) => {
    // const result = await userDeleteApi(params);
    userListApi.updateCache({}, (users: AdminUser[]) => {
      const i = users.findIndex((v) => v.idNo === params.idNo);
      users.splice(i, 1);
    });
    return 'asdf';
  };
}
