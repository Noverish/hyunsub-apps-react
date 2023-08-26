import { generateApi } from 'src/api/generate-api';

const withdrawApi = generateApi<{}, any>(() => ({
  url: '/api/v1/withdraw',
  method: 'POST',
}));

export default withdrawApi;
