import { Photo } from "src/model/photo";
import { generateQuery } from "../generate-api";

export interface AlbumPhotosParams {
  albumId: number;
  page: number;
}

const albumPhotosApi = generateQuery<AlbumPhotosParams, Photo[]>({
  api: (params) => ({
    url: `/api/v1/album/${params.albumId}/photos`,
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: (params) => ['albumPhotos', params.albumId.toString(), params.page.toString()],
})

export default albumPhotosApi;
