import { PageData } from "src/model/api";
import { Photo } from "src/model/photo";
import { generateQuery } from "../generate-api";

export interface AlbumPhotosParams {
  albumId: number;
  page?: number;
  photoId?: number;
}

const albumPhotosApi = generateQuery<AlbumPhotosParams, PageData<Photo>>({
  api: (params) => ({
    url: `/api/v1/album/${params.albumId}/photos`,
    method: 'GET',
    params: {
      p: params.page,
      photoId: params.photoId,
    }
  }),
  key: (params) => ['albumPhotos', JSON.stringify(params, Object.keys(params).sort())],
})

export default albumPhotosApi;
