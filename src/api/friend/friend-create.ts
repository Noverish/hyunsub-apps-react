import friendDetailApi from './friend-detail';
import friendTagDetailApi from './friend-tag-friends';
import friendListApi from 'src/api/friend/friend-list';
import friendTagListApi from 'src/api/friend/friend-tag-list';
import { generateApi } from 'src/api/generate-api';
import { Friend } from 'src/model/friend';

const _friendCreateApi = generateApi<Friend, Friend>((params) => ({
  url: `/api/v1/friends`,
  method: 'POST',
  data: params,
}));

const friendCreateApi = async (params: Friend): Promise<Friend> => {
  const result = await _friendCreateApi(params);

  friendDetailApi.setCache({ friendId: result.id }, result);
  friendListApi.clearCache();
  friendTagListApi.invalidate();
  friendTagDetailApi.clearCache();

  return result;
};

export default friendCreateApi;
