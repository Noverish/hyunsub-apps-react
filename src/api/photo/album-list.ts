import { AlbumPreview } from "src/model/photo";
import { generateQuery } from "../generate-api";

const albumListApi = generateQuery<{}, AlbumPreview[]>({
  api: () => ({
    url: '/api/v2/albums',
    method: 'GET',
  }),
  key: () => 'albumListApi',
})

export default albumListApi;
