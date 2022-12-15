import { generateQuery } from "../generate-api";

const apparelCategories = generateQuery<{}, string[]>({
  api: () => ({
    url: '/api/v1/categories',
    method: 'GET',
  }),
  key: () => 'apparelCategories',
})

export default apparelCategories;
