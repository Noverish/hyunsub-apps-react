import { generateApi } from '../generate-api';
import albumDetailApi from './album-detail';
import albumPhotosApi from './album-photos';
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
  },
});

export default photoDeleteBulkApi;
