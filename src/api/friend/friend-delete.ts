import friendListApi from './friend-list';
import friendDetailApi from 'src/api/friend/friend-detail';
import friendTagDetailApi from 'src/api/friend/friend-tag-friends';
import friendTagListApi from 'src/api/friend/friend-tag-list';
import { generateApi } from 'src/api/generate-api';
import { Friend } from 'src/model/friend';

export interface FriendDeleteParams {
  friendId: string;
}

const _friendDeleteApi = generateApi<FriendDeleteParams, Friend>(({ friendId }) => ({
  url: `/api/v1/friends/${friendId}`,
  method: 'DELETE',
}));

const friendDeleteApi = async (params: FriendDeleteParams): Promise<Friend> => {
  const result = await _friendDeleteApi(params);

  friendDetailApi.setCache({ friendId: result.id }, null);
  friendListApi.clearCache();
  friendTagListApi.invalidate();
  friendTagDetailApi.clearCache();

  return result;
};

export default friendDeleteApi;
