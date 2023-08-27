import { generateQuery } from '../generate-api';
import { Photo } from 'src/model/photo';

export interface AlbumPhotoDetailParams {
  photoId: string;
  albumId: string;
}

const albumPhotoDetailApi = generateQuery<AlbumPhotoDetailParams, Photo>({
  api: ({ albumId, photoId }) => ({
    url: `/api/v2/albums/${albumId}/photos/${photoId}`,
    method: 'GET',
  }),
  key: 'albumPhotoDetailApi',
});

export default albumPhotoDetailApi;
