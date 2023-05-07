import { generateQuery } from '../generate-api';
import { Photo } from 'src/model/photo';

export interface PhotoDetailParams {
  photoId: string;
}

const photoDetailApi = generateQuery<PhotoDetailParams, Photo>({
  api: (params) => ({
    url: `/api/v2/photos/${params.photoId}`,
    method: 'GET',
  }),
  key: () => 'photoDetailApi',
});

export default photoDetailApi;
