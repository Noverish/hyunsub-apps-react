import { useInfiniteQuery } from "@tanstack/react-query";
import { generateQuery } from "src/api/generate-api";
import { PageData } from "src/model/api";
import { ApparelPreview } from "src/model/apparel";

interface ListApparelParams {
  page: number;
}

const listApparel = generateQuery<ListApparelParams, PageData<ApparelPreview>>({
  api: (params) => ({
    url: '/api/v1/apparels',
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: () => 'apparels',
})

export default listApparel;

export const useInfiniteApparel = (params: ListApparelParams) => useInfiniteQuery(
  listApparel.key(params),
  ({ pageParam }) => listApparel.fetch({ ...params, page: pageParam ?? 0 }),
  {
    getNextPageParam: (lastPage, pages) => (lastPage.data.length === 0) ? undefined : pages.length,
    staleTime: Infinity,
  }
)
