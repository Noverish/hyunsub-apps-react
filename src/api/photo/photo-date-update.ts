import { generateApi } from '../generate-api';
import photoDetailApi from './photo-detail';
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
    const newPhotoId = result.id;
    photoDetailApi.setCache({ photoId: newPhotoId }, result);
  },
});

export default photoDateUpdateApi;
