import { AlbumPreview } from "src/model/photo";
import { generateApi } from "../generate-api";

export interface AlbumCreateParams {
  name: string;
}

const albumCreateApi = generateApi<AlbumCreateParams, AlbumPreview>(params => ({
  url: `/api/v2/albums`,
  method: 'POST',
  data: params,
}))

export default albumCreateApi;
