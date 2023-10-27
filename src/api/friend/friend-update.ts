import { generateApi } from 'src/api/generate-api';
import { Friend } from 'src/model/friend';

const friendUpdateApi = generateApi<Friend, Friend>((params) => ({
  url: `/api/v1/friends/${params.id}`,
  method: 'PUT',
  data: params,
}));

export default friendUpdateApi;
