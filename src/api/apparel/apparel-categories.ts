import { generateNoParamQuery } from "../generate-api";

const apparelCategories = generateNoParamQuery<string[]>({
  api: () => ({
    url: '/api/v1/categories',
    method: 'GET',
  }),
  key: () => 'apparelCategories',
})

export default apparelCategories;
