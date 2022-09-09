import { Album } from "src/model/photo";
import { generateNoParamQuery } from "../generate-api";

const albumsApi = generateNoParamQuery<Album[]>({
  api: () => ({
    url: '/api/v1/album',
    method: 'GET',
  }),
  key: () => ['albums'],
})

export default albumsApi;
