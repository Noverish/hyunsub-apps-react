import { Photo } from "src/model/photo";
import { generateInfiniteQuery } from "../generate-api";

export interface AlbumPhotosParams {
  albumId: number;
  photoId?: number;
}

const albumPhotosApi = generateInfiniteQuery<AlbumPhotosParams, Photo>({
  api: (params) => ({
    url: `/api/v1/albums/${params.albumId}/photos`,
    method: 'GET',
    params: {
      photoId: params.photoId,
      p: (params.photoId) ? undefined : params.page,
    }
  }),
  key: () => 'albumPhotosApi',
});

export default albumPhotosApi;
