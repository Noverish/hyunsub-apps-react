import { VideoCategory } from "src/model/video";
import { generateNoParamQuery } from "src/api/generate-api";

const getCategories = generateNoParamQuery<VideoCategory[]>({
  api: () => ({
    url: '/api/v1/category',
    method: 'GET',
  }),
  key: () => 'categories',
});

export default getCategories;
