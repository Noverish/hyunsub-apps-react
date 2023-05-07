import { generateApi } from '../generate-api';
import { Apparel } from 'src/model/apparel';

const apparelAddApi = generateApi<Partial<Apparel>, Apparel>((params) => ({
  url: '/api/v1/apparels',
  method: 'POST',
  data: params,
}));

export default apparelAddApi;
