import { generateInfiniteQuery } from '../generate-infinite-query';
import { PhotoPreview } from 'src/model/photo';

export interface AlbumPhotosParams {
  albumId: string;
  photoId?: string | null;
  userIds?: string[];
}

const albumPhotosApi = generateInfiniteQuery<AlbumPhotosParams, PhotoPreview>({
  api: (params) => ({
    url: `/api/v1/search/albums/${params.albumId}/photos`,
    method: 'POST',
    data: params,
  }),
  key: 'albumPhotosApi',
});

export default albumPhotosApi;
