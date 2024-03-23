import { generateApi } from '../generate-api';
import albumDetailApi from './album-detail';
import albumListApi from './album-list';
import albumPhotosApi from './album-photos';
import photoSearchApi from './photo-search';

export interface PhotoDeleteParams {
  photoIds: string[];
}

const photoDeleteApi = generateApi<PhotoDeleteParams, any>({
  api: (data) => ({
    url: `/api/v1/_bulk/photos/delete`,
    method: 'POST',
    data,
  }),
  postHandle: () => {
    albumDetailApi.invalidate();
    albumPhotosApi.invalidate();
    albumListApi.invalidate();
    photoSearchApi.invalidate();
  },
});

export default photoDeleteApi;
