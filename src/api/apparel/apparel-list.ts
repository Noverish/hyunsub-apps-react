import { generateInfiniteQuery } from "src/api/generate-api";
import { ApparelPreview } from "src/model/apparel";

interface ListApparelParams {
  query?: string;
}

const apparelList = generateInfiniteQuery<ListApparelParams, ApparelPreview>({
  api: (params) => ({
    url: '/api/v1/apparels',
    method: 'GET',
    params: {
      p: params.page,
      q: params.query,
    }
  }),
  key: () => 'apparelList',
})

export default apparelList;
