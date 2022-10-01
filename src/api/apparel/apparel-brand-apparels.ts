import { ApparelPreview } from "src/model/apparel";
import { generateInfiniteQuery } from "../generate-api";

interface ApparelBrandApparelsParams {
  brand: string;
}

const apparelBrandApparels = generateInfiniteQuery<ApparelBrandApparelsParams, ApparelPreview>({
  api: (params) => ({
    url: `/api/v1/brands/${params.brand}/apparels`,
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: () => 'apparelBrandApparels',
})

export default apparelBrandApparels;
