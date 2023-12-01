import userListApi from './user-list';
import { generateApi } from 'src/api/generate-api';
import { AdminUser } from 'src/model/auth';

export interface UserAuthorityCreateParams {
  idNo: string;
  authorityId: number;
}

const userAuthorityCreateApi = generateApi<UserAuthorityCreateParams, any>({
  api: (params) => ({
    url: '/api/v1/admin/users/authority',
    method: 'PUT',
    data: params,
  }),
});

export default userAuthorityCreateApi;

export function useUserAuthorityCreate() {
  return async (params: UserAuthorityCreateParams) => {
    const result = await userAuthorityCreateApi(params);
    userListApi.updateCache({}, (users: AdminUser[]) => {
      users.forEach((v) => {
        if (v.idNo === params.idNo) {
          v.authorities.push(params.authorityId);
        }
      });
    });
    return result;
  };
}
