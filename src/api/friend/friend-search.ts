import { generateQuery } from '../generate-api';
import { PageData } from 'src/model/api';
import { FriendPreview } from 'src/model/friend';

export interface FriendSearchParams {
  page: number;
  query: string;
}

const friendSearchApi = generateQuery<FriendSearchParams, PageData<FriendPreview>>({
  api: (params) => ({
    url: `/api/v1/search`,
    method: 'POST',
    data: params,
  }),
  key: 'friendSearchApi',
});

export default friendSearchApi;
