import userListApi from './user-list';
import { generateApi } from 'src/api/generate-api';
import { SimpleResponse } from 'src/model/api';
import { AdminUser } from 'src/model/auth';

export interface UserAuthorityDeleteParams {
  idNo: string;
  authorityId: number;
}

const userAuthorityDeleteApi = generateApi<UserAuthorityDeleteParams, SimpleResponse>({
  api: (params) => ({
    url: '/api/v1/admin/users/authority',
    method: 'DELETE',
    data: params,
  }),
  postHandle: (result, params) => {
    userListApi.updateCache({}, (users: AdminUser[]) => {
      const user = users.filter((v) => v.idNo === params.idNo)[0];
      if (user) {
        const i = user.authorities.indexOf(params.authorityId);
        user.authorities.splice(i, 1);
      }
    });
  },
});

export default userAuthorityDeleteApi;
