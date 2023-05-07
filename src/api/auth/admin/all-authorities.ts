import { generateQuery } from 'src/api/generate-api';
import { AdminAuthority } from 'src/model/auth';

const getAllAuthorities = generateQuery<{}, AdminAuthority[]>({
  api: () => ({
    url: '/api/v1/admin/authorities',
    method: 'GET',
  }),
  key: () => 'allAuthorities',
});

export default getAllAuthorities;
