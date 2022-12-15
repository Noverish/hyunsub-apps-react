import { VideoCategory } from "src/model/video";
import { generateQuery } from "src/api/generate-api";

const getCategories = generateQuery<{}, VideoCategory[]>({
  api: () => ({
    url: '/api/v1/category',
    method: 'GET',
  }),
  key: () => 'categories',
});

export default getCategories;
