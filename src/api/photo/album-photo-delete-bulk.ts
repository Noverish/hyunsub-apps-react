import { generateApi } from '../generate-api';
import albumDetailApi from './album-detail';
import albumListApi from './album-list';
import albumPhotosApi from './album-photos';
import { PhotoPreview } from 'src/model/photo';

export interface AlbumPhotoDeleteBulkParams {
  albumId: string;
  photoIds: string[];
}

const albumPhotoDeleteBulkApi = generateApi<AlbumPhotoDeleteBulkParams, PhotoPreview[]>({
  api: (params) => ({
    url: `/api/v1/_bulk/albums/photos/delete`,
    method: 'POST',
    data: params,
  }),
  postHandle: (result, { albumId }) => {
    albumListApi.invalidate();
    albumPhotosApi.invalidate();

    const num = result.length;
    albumDetailApi.updateCache({ albumId }, (cache) => {
      if (cache) {
        cache.total = cache.total - num;
      }
    });
  },
});

export default albumPhotoDeleteBulkApi;
