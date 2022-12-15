import { AlbumPreview } from "src/model/photo";
import { generateQuery } from "../generate-api";

const albumListApi = generateQuery<{}, AlbumPreview[]>({
  api: () => ({
    url: '/api/v1/albums',
    method: 'GET',
  }),
  key: () => 'albumList',
})

export default albumListApi;
