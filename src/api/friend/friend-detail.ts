import { generateQuery } from '../generate-api';
import { Friend } from 'src/model/friend';

interface FriendDetailParams {
  friendId: string;
}

const friendDetailApi = generateQuery<FriendDetailParams, Friend | null>({
  api: ({ friendId }) => ({
    url: `/api/v1/friends/${friendId}`,
    method: 'GET',
  }),
  key: 'friendDetailApi',
});

export default friendDetailApi;
