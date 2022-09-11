import { AlbumPreview } from "src/model/photo";
import { generateNoParamQuery } from "../generate-api";

const albumListApi = generateNoParamQuery<AlbumPreview[]>({
  api: () => ({
    url: '/api/v1/albums',
    method: 'GET',
  }),
  key: () => 'albumList',
})

export default albumListApi;
