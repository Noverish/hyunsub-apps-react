import { generateApi } from 'src/api/generate-api';
import { SimpleResponse } from 'src/model/api';

const withdrawApi = generateApi<{}, SimpleResponse>({
  api: () => ({
    url: '/api/v1/withdraw',
    method: 'POST',
  }),
});

export default withdrawApi;
