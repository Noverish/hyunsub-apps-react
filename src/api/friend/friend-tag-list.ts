import { generateQuery } from '../generate-api';

const friendTagListApi = generateQuery<{}, string[]>({
  api: () => ({
    url: `/api/v1/tags`,
    method: 'GET',
  }),
  key: 'friendTagListApi',
});

export default friendTagListApi;
