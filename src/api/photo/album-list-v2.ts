import { AlbumPreview } from "src/model/photo";
import { generateQuery } from "../generate-api";

const albumListV2Api = generateQuery<{}, AlbumPreview[]>({
  api: () => ({
    url: '/api/v2/albums',
    method: 'GET',
  }),
  key: () => 'albumListV2Api',
})

export default albumListV2Api;
