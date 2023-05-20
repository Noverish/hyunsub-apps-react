import { generateInfiniteQuery } from '../generate-infinite-query';
import { ApparelPreview } from 'src/model/apparel';

interface ListApparelParams {
  query?: string;
}

const apparelListApi = generateInfiniteQuery<ListApparelParams, ApparelPreview>({
  api: (params) => ({
    url: '/api/v1/apparels',
    method: 'GET',
    params: {
      p: params.page,
      q: params.query,
    },
  }),
  key: () => 'apparelList',
});

export default apparelListApi;
