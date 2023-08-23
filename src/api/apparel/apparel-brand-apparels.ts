import { generateInfiniteQuery } from '../generate-infinite-query';
import { ApparelPreview } from 'src/model/apparel';

interface ApparelBrandApparelsParams {
  brand: string;
}

const apparelBrandApparelsApi = generateInfiniteQuery<ApparelBrandApparelsParams, ApparelPreview>({
  api: (params) => ({
    url: `/api/v1/brands/${params.brand}/apparels`,
    method: 'GET',
    params: {
      p: params.page,
    },
  }),
  key: 'apparelBrandApparels',
});

export default apparelBrandApparelsApi;
