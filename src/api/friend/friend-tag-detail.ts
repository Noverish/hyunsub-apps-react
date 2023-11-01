import { generateQuery } from '../generate-api';
import { FriendTag } from 'src/model/friend';

interface FriendTagDetailParams {
  tag: string;
}

const friendTagDetailApi = generateQuery<FriendTagDetailParams, FriendTag>({
  api: (params) => ({
    url: `/api/v1/tags/${params.tag}`,
    method: 'GET',
  }),
  key: 'friendTagDetailApi',
});

export default friendTagDetailApi;
