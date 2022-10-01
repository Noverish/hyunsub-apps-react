import { ApparelPreview } from "src/model/apparel";
import { generateInfiniteQuery } from "../generate-api";

interface ApparelCategoryApparelsParams {
  category: string;
}

const apparelCategoryApparels = generateInfiniteQuery<ApparelCategoryApparelsParams, ApparelPreview>({
  api: (params) => ({
    url: `/api/v1/categories/${params.category}/apparels`,
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: () => 'apparelCategoryApparels',
})

export default apparelCategoryApparels;
