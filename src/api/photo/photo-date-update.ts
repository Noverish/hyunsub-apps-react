import { generateApi } from '../generate-api';
import photoDetailApi from './photo-detail';
import photoListApi from './photo-list';
import { Photo } from 'src/model/photo';

export interface PhotoDateUpdateParams {
  photoId: string;
  date: string;
}

const photoDateUpdateApi = generateApi<PhotoDateUpdateParams, Photo>({
  api: (data) => ({
    url: `/api/v1/photos/${data.photoId}/date`,
    method: 'PUT',
    data,
  }),
  postHandle: (result, params) => {
    const oldPhotoId = params.photoId;
    const newPhotoId = result.id;
    photoDetailApi.setCache({ photoId: newPhotoId }, result);
    photoListApi.updateCache(null, (v) => {
      if (v.id === oldPhotoId) {
        v.id = newPhotoId;
      }
    });
  },
});

export default photoDateUpdateApi;
