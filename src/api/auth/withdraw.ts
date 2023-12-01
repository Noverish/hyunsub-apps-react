import { generateApi } from 'src/api/generate-api';

const withdrawApi = generateApi<{}, any>({
  api: () => ({
    url: '/api/v1/withdraw',
    method: 'POST',
  }),
});

export default withdrawApi;
