import { AdminUser } from "src/model/auth";
import { generateQuery } from 'src/api/generate-api';

const getAllUsers = generateQuery<{}, AdminUser[]>({
  api: () => ({
    url: '/api/v1/admin/users',
    method: 'GET',
  }),
  key: () => 'allUsers',
});

export default getAllUsers;
