import { generateQuery } from "../generate-api";

const apparelBrands = generateQuery<{}, string[]>({
  api: () => ({
    url: '/api/v1/brands',
    method: 'GET',
  }),
  key: () => 'apparelBrands',
})

export default apparelBrands;
