import { generateQuery } from '../generate-api';

const apparelCategoriesApi = generateQuery<{}, string[]>({
  api: () => ({
    url: '/api/v1/categories',
    method: 'GET',
  }),
  key: () => 'apparelCategories',
});

export default apparelCategoriesApi;
