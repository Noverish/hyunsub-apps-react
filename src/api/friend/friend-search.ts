import { generateInfiniteQuery } from '../generate-infinite-query';
import { FriendPreview } from 'src/model/friend';

export interface FriendSearchParams {
  query?: string;
}

const friendSearchApi = generateInfiniteQuery<FriendSearchParams, FriendPreview>({
  api: (params) => ({
    url: `/api/v1/search`,
    method: 'POST',
    data: params,
  }),
  key: 'friendSearchApi',
});

export default friendSearchApi;
