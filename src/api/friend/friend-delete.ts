import friendListApi from './friend-list';
import friendSearchApi from './friend-search';
import friendDetailApi from 'src/api/friend/friend-detail';
import friendTagDetailApi from 'src/api/friend/friend-tag-friends';
import friendTagListApi from 'src/api/friend/friend-tag-list';
import { generateApi2 } from 'src/api/generate-api';
import { Friend } from 'src/model/friend';

export interface FriendDeleteParams {
  friendId: string;
}

const friendDeleteApi = generateApi2<FriendDeleteParams, Friend>({
  api: ({ friendId }) => ({
    url: `/api/v1/friends/${friendId}`,
    method: 'DELETE',
  }),
  postHandle: (result) => {
    friendDetailApi.setCache({ friendId: result.id }, null);
    friendSearchApi.clearCache();
    friendListApi.clearCache();
    friendTagListApi.invalidate();
    friendTagDetailApi.clearCache();
  },
});

export default friendDeleteApi;
