import { generateApi } from '../generate-api';
import albumListApi from './album-list';
import { Album } from 'src/model/photo';

export interface AlbumThumbnailParams {
  albumId: string;
  photoId: string;
}

const albumThumbnailApi = generateApi<AlbumThumbnailParams, Album>({
  api: (params) => ({
    url: `/api/v1/albums/${params.albumId}/thumbnail`,
    method: 'POST',
    data: params,
  }),
  postHandle: (result) => {
    albumListApi.clearCache();
  },
});

export default albumThumbnailApi;
