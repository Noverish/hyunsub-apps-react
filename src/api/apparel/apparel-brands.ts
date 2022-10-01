import { generateNoParamQuery } from "../generate-api";

const apparelBrands = generateNoParamQuery<string[]>({
  api: () => ({
    url: '/api/v1/brands',
    method: 'GET',
  }),
  key: () => 'apparelBrands',
})

export default apparelBrands;
