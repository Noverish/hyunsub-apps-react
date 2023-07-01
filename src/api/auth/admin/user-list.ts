import { generateQuery } from 'src/api/generate-api';
import { AdminUser } from 'src/model/auth';

const userListApi = generateQuery<{}, AdminUser[]>({
  api: () => ({
    url: '/api/v1/admin/users',
    method: 'GET',
  }),
  key: () => 'allUsers',
});

export default userListApi;
