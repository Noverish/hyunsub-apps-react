import { generateQuery } from '../generate-api';
import { FriendTagPreview } from 'src/model/friend';

const friendTagListApi = generateQuery<{}, FriendTagPreview[]>({
  api: () => ({
    url: `/api/v1/tags`,
    method: 'GET',
  }),
  key: 'friendTagListApi',
});

export default friendTagListApi;
