import userListApi from './user-list';
import { generateApi } from 'src/api/generate-api';
import { SimpleResponse } from 'src/model/api';
import { AdminUser } from 'src/model/auth';

export interface UserAuthorityCreateParams {
  idNo: string;
  authorityId: number;
}

const userAuthorityCreateApi = generateApi<UserAuthorityCreateParams, SimpleResponse>({
  api: (params) => ({
    url: '/api/v1/admin/users/authority',
    method: 'PUT',
    data: params,
  }),
  postHandle: (result, params) => {
    userListApi.updateCache({}, (users: AdminUser[]) => {
      const user = users.filter((v) => v.idNo === params.idNo)[0];
      if (user) {
        user.authorities.push(params.authorityId);
      }
    });
  },
});

export default userAuthorityCreateApi;
