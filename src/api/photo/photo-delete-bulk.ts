import { generateApi } from '../generate-api';
import albumDetailApi from './album-detail';
import albumListApi from './album-list';
import albumPhotosApi from './album-photos';
import photoListApi from './photo-list';
import { Photo } from 'src/model/photo';

export interface PhotoDeleteBulkParams {
  photoIds: string[];
}

const photoDeleteBulkApi = generateApi<PhotoDeleteBulkParams, Photo[]>({
  api: (data) => ({
    url: `/api/v1/_bulk/photos/delete`,
    method: 'POST',
    data,
  }),
  postHandle: () => {
    albumDetailApi.invalidate();
    albumPhotosApi.invalidate();
    albumListApi.invalidate();
    photoListApi.invalidate();
  },
});

export default photoDeleteBulkApi;