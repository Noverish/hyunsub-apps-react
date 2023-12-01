import { generateApi } from '../generate-api';
import { SimpleResponse } from 'src/model/api';

const apparelDeleteApi = generateApi<string, SimpleResponse>({
  api: (params) => ({
    url: `/api/v1/apparels/${params}`,
    method: 'DELETE',
  }),
});

export default apparelDeleteApi;
