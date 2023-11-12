import friendDetailApi from 'src/api/friend/friend-detail';
import friendListApi from 'src/api/friend/friend-list';
import friendSearchApi from 'src/api/friend/friend-search';
import friendTagDetailApi from 'src/api/friend/friend-tag-friends';
import friendTagListApi from 'src/api/friend/friend-tag-list';
import { generateApi2 } from 'src/api/generate-api';
import { Friend } from 'src/model/friend';

const friendUpdateApi = generateApi2<Friend, Friend>({
  api: (params) => ({
    url: `/api/v1/friends/${params.id}`,
    method: 'PUT',
    data: params,
  }),
  postHandle: (result) => {
    friendDetailApi.setCache({ friendId: result.id }, result);
    friendSearchApi.clearCache();
    friendListApi.clearCache();
    friendTagListApi.invalidate();
    friendTagDetailApi.clearCache();
  },
});

export default friendUpdateApi;
