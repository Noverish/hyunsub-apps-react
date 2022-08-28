import { VideoCategory } from "src/model/video";
import { generateNoParamQuery } from "../generate-api-v2";

const getCategories = generateNoParamQuery<VideoCategory[]>({
  api: () => ({
    url: '/api/v1/category',
    method: 'GET',
  }),
  key: () => ['categories'],
});

export default getCategories;
