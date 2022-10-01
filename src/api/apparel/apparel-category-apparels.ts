import { ApparelPreview } from "src/model/apparel";
import { generateQuery } from "../generate-api";
import {useInfiniteQuery} from '@tanstack/react-query';
import { PageData } from "src/model/api";

interface ApparelCategoryApparelsParams {
  category: string;
  page: number;
}

const apparelCategoryApparels = generateQuery<ApparelCategoryApparelsParams, PageData<ApparelPreview>>({
  api: (params: ApparelCategoryApparelsParams) => ({
    url: `/api/v1/categories/${params.category}/apparels`,
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: () => 'apparelCategoryApparels',
})

export default apparelCategoryApparels;

export const useInfiniteApparelCategoryApparels = (params: ApparelCategoryApparelsParams) => useInfiniteQuery(
  apparelCategoryApparels.key(params),
  ({ pageParam }) => apparelCategoryApparels.fetch({ ...params, page: pageParam ?? 0 }),
  {
    getNextPageParam: (lastPage, pages) => (lastPage.data.length === 0) ? undefined : pages.length,
    staleTime: Infinity,
  }
)
