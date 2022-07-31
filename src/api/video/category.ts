import { VideoCategory } from "src/model/video";
import { generateNoParamApi } from "../generate-api";

const getCategories = generateNoParamApi<VideoCategory[]>(() => ({
  url: '/api/v1/category',
  method: 'GET',
}));

export default getCategories;
