import { generateInfiniteQuery } from '../generate-api';
import { ApparelPreview } from 'src/model/apparel';

interface ApparelCategoryApparelsParams {
  category: string;
}

const apparelCategoryApparelsApi = generateInfiniteQuery<ApparelCategoryApparelsParams, ApparelPreview>({
  api: (params) => ({
    url: `/api/v1/categories/${params.category}/apparels`,
    method: 'GET',
    params: {
      p: params.page,
    },
  }),
  key: () => 'apparelCategoryApparels',
});

export default apparelCategoryApparelsApi;
