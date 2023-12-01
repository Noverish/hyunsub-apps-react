import friendDetailApi from './friend-detail';
import friendSearchApi from './friend-search';
import friendTagDetailApi from './friend-tag-friends';
import friendListApi from 'src/api/friend/friend-list';
import friendTagListApi from 'src/api/friend/friend-tag-list';
import { generateApi } from 'src/api/generate-api';
import { Friend } from 'src/model/friend';

const friendCreateApi = generateApi<Friend, Friend>({
  api: (params) => ({
    url: `/api/v1/friends`,
    method: 'POST',
    data: params,
  }),
  postHandle: (result) => {
    friendDetailApi.setCache({ friendId: result.id }, result);
    friendSearchApi.invalidate();
    friendListApi.clearCache();
    friendTagListApi.invalidate();
    friendTagDetailApi.clearCache();
  },
});

export default friendCreateApi;
