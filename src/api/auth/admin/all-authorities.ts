import { AdminAuthority } from "src/model/auth";
import { generateNoParamQuery} from '../../generate-api-v2';

const getAllAuthorities = generateNoParamQuery<AdminAuthority[]>({
  api: () => ({
    url: '/api/v1/admin/authorities',
    method: 'GET',
  }),
  key: () => ['allAuthorities'],
});

export default getAllAuthorities;
