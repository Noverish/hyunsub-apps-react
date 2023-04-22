import { AlbumPreview } from "src/model/photo";
import { generateApi } from "../generate-api";

export interface AlbumDeleteParams {
  albumId: string;
}

const albumDeleteApi = generateApi<AlbumDeleteParams, AlbumPreview>(params => ({
  url: `/api/v2/albums/${params.albumId}`,
  method: 'DELETE',
}))

export default albumDeleteApi;
