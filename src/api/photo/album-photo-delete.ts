import { generateApi } from '../generate-api';
import albumDetailApi from './album-detail';
import albumListApi from './album-list';
import albumPhotosApi from './album-photos';
import { PhotoPreview } from 'src/model/photo';

export interface AlbumPhotoDeleteParams {
  albumId: string;
  photoIds: string[];
}

const albumPhotoDeleteApi = generateApi<AlbumPhotoDeleteParams, PhotoPreview[]>({
  api: (params) => ({
    url: `/api/v1/_bulk/albums/photos/delete`,
    method: 'POST',
    data: params,
  }),
  postHandle: () => {
    albumListApi.invalidate();
    albumPhotosApi.invalidate();
    albumDetailApi.invalidate();
  },
});

export default albumPhotoDeleteApi;
