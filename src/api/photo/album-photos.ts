import { generateInfiniteQuery } from '../generate-api';
import { PhotoPreview } from 'src/model/photo';

export interface AlbumPhotosParams {
  albumId: string;
  photoId?: string | null;
}

const albumPhotosApi = generateInfiniteQuery<AlbumPhotosParams, PhotoPreview>({
  api: (params) => ({
    url: `/api/v2/albums/${params.albumId}/photos`,
    method: 'GET',
    params: {
      p: params.page,
      photoId: params.page === undefined ? params.photoId : undefined,
    },
  }),
  key: () => 'albumPhotosApi',
});

export default albumPhotosApi;
