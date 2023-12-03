import { generateQuery } from '../generate-api';
import { Photo } from 'src/model/photo';

export interface PhotoDetailParams {
  photoId: string;
  albumId?: string;
}

const photoDetailApi = generateQuery<PhotoDetailParams, Photo>({
  api: ({ photoId, ...params }) => ({
    url: `/api/v1/photos/${photoId}`,
    method: 'GET',
    params,
  }),
  key: 'photoDetailApi',
});

export default photoDetailApi;
