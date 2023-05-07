import { generateApi } from '../generate-api';

const apparelDeleteApi = generateApi<string, any>((params) => ({
  url: `/api/v1/apparels/${params}`,
  method: 'DELETE',
}));

export default apparelDeleteApi;
