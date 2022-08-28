import { AdminUser } from "src/model/auth";
import { generateNoParamQuery } from '../../generate-api-v2';

const getAllUsers = generateNoParamQuery<AdminUser[]>({
  api: () => ({
    url: '/api/v1/admin/users',
    method: 'GET',
  }),
  key: () => ['allUsers'],
});

export default getAllUsers;
