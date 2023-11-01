import friendDetailApi from 'src/api/friend/friend-detail';
import friendListApi from 'src/api/friend/friend-list';
import friendTagDetailApi from 'src/api/friend/friend-tag-detail';
import friendTagListApi from 'src/api/friend/friend-tag-list';
import { generateApi } from 'src/api/generate-api';
import { Friend } from 'src/model/friend';

const _friendUpdateApi = generateApi<Friend, Friend>((params) => ({
  url: `/api/v1/friends/${params.id}`,
  method: 'PUT',
  data: params,
}));

const friendUpdateApi = async (params: Friend): Promise<Friend> => {
  const result = await _friendUpdateApi(params);

  friendDetailApi.setCache({ friendId: result.id }, result);
  friendListApi.clearCache();
  friendTagListApi.invalidate();
  friendTagDetailApi.clearCache();

  return result;
};

export default friendUpdateApi;
