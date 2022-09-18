import { AdminUser } from "src/model/auth";
import { generateNoParamQuery } from 'src/api/generate-api';

const getAllUsers = generateNoParamQuery<AdminUser[]>({
  api: () => ({
    url: '/api/v1/admin/users',
    method: 'GET',
  }),
  key: () => 'allUsers',
});

export default getAllUsers;
