import { generateApi } from 'src/api/generate-api';
import { AdminUser } from 'src/model/auth';

export interface UserLoginParams {
  idNo: string;
}

const userLoginApi = generateApi<UserLoginParams, AdminUser>({
  api: (params) => ({
    url: `/api/v1/admin/users/${params.idNo}/login`,
    method: 'POST',
  }),
});

export default userLoginApi;
