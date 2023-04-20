import { AlbumPreview } from "src/model/photo";
import { generateApi } from "../generate-api";

export interface AlbumThumbnailParams {
  albumId: string;
  photoId: string;
}

const albumThumbnailApi = generateApi<AlbumThumbnailParams, AlbumPreview>(params => ({
  url: `/api/v2/albums/${params.albumId}/thumbnail`,
  method: 'POST',
  data: {
    photoId: params.photoId,
  }
}));

export default albumThumbnailApi;
