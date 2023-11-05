import { generateQuery } from '../generate-api';
import { PageData } from 'src/model/api';
import { FriendPreview } from 'src/model/friend';

interface FriendTagFriendsParams {
  tag: string;
  p: number;
}

const friendTagFriendsApi = generateQuery<FriendTagFriendsParams, PageData<FriendPreview>>({
  api: ({ tag, ...params }) => ({
    url: `/api/v1/tags/${tag}/friends`,
    method: 'GET',
    params,
  }),
  key: 'friendTagFriendsApi',
});

export default friendTagFriendsApi;
