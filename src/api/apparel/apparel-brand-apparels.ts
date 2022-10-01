import { ApparelPreview } from "src/model/apparel";
import { generateQuery } from "../generate-api";
import {useInfiniteQuery} from '@tanstack/react-query';
import { PageData } from "src/model/api";

interface ApparelBrandApparelsParams {
  brand: string;
  page: number;
}

const apparelBrandApparels = generateQuery<ApparelBrandApparelsParams, PageData<ApparelPreview>>({
  api: (params: ApparelBrandApparelsParams) => ({
    url: `/api/v1/brands/${params.brand}/apparels`,
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: () => 'apparelBrandApparels',
})

export default apparelBrandApparels;

export const useInfiniteApparelBrandApparels = (params: ApparelBrandApparelsParams) => useInfiniteQuery(
  apparelBrandApparels.key(params),
  ({ pageParam }) => apparelBrandApparels.fetch({ ...params, page: pageParam ?? 0 }),
  {
    getNextPageParam: (lastPage, pages) => (lastPage.data.length === 0) ? undefined : pages.length,
    staleTime: Infinity,
  }
)
