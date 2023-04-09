import { PhotoPreview } from "src/model/photo";
import { generateInfiniteQuery } from "../generate-api";

export interface AlbumPhotosParams {
  albumId: string;
}

const albumPhotosApi2 = generateInfiniteQuery<AlbumPhotosParams, PhotoPreview>({
  api: (params) => ({
    url: `/api/v2/albums/${params.albumId}/photos`,
    method: 'GET',
    params: {
      p: params.page,
    }
  }),
  key: () => 'albumPhotosApi',
});

export default albumPhotosApi2;
