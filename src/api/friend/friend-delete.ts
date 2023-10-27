import { generateApi } from 'src/api/generate-api';
import { Friend } from 'src/model/friend';

export interface FriendDeleteParams {
  friendId: string;
}

const friendDeleteApi = generateApi<FriendDeleteParams, Friend>(({ friendId }) => ({
  url: `/api/v1/friends/${friendId}`,
  method: 'DELETE',
}));

export default friendDeleteApi;
