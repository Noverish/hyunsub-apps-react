import { generateApi } from 'src/api/generate-api';
import { AdminUser } from 'src/model/auth';

export interface UserCreateParams {
  name: string;
}

const userCreateApi = generateApi<UserCreateParams, AdminUser>({
  api: (params) => ({
    url: '/api/v1/admin/users',
    method: 'POST',
    data: params,
  }),
});

export default userCreateApi;
