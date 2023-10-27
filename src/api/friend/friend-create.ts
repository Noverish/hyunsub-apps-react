import { generateApi } from 'src/api/generate-api';
import { Friend } from 'src/model/friend';

const friendCreateApi = generateApi<Friend, Friend>((params) => ({
  url: `/api/v1/friends`,
  method: 'POST',
  data: params,
}));

export default friendCreateApi;
