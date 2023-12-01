import userListApi from './user-list';
import { generateApi } from 'src/api/generate-api';
import { AdminUser } from 'src/model/auth';

export interface UserAuthorityDeleteParams {
  idNo: string;
  authorityId: number;
}

const userAuthorityDeleteApi = generateApi<UserAuthorityDeleteParams, any>({
  api: (params) => ({
    url: '/api/v1/admin/users/authority',
    method: 'DELETE',
    data: params,
  }),
});

export default userAuthorityDeleteApi;

export function useUserAuthorityDelete() {
  return async (params: UserAuthorityDeleteParams) => {
    const result = await userAuthorityDeleteApi(params);
    userListApi.updateCache({}, (users: AdminUser[]) => {
      users.forEach((v) => {
        if (v.idNo === params.idNo) {
          const i = v.authorities.indexOf(params.authorityId);
          v.authorities.splice(i, 1);
        }
      });
    });
    return result;
  };
}
