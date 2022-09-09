import { AdminAuthority } from "src/model/auth";
import { generateNoParamQuery} from 'src/api/generate-api';

const getAllAuthorities = generateNoParamQuery<AdminAuthority[]>({
  api: () => ({
    url: '/api/v1/admin/authorities',
    method: 'GET',
  }),
  key: () => ['allAuthorities'],
});

export default getAllAuthorities;
