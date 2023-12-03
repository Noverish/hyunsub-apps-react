import { generateApi } from '../generate-api';
import albumDetailApi from './album-detail';
import albumListApi from './album-list';
import albumPhotosApi from './album-photos';
import { Album } from 'src/model/photo';

export interface AlbumDeleteParams {
  albumId: string;
}

const albumDeleteApi = generateApi<AlbumDeleteParams, Album>({
  api: (params) => ({
    url: `/api/v1/albums/${params.albumId}`,
    method: 'DELETE',
  }),
  postHandle: ({ id: albumId }) => {
    albumListApi.deleteCache(null, (v) => v.id === albumId);
    setTimeout(() => {
      albumListApi.invalidate();
      albumDetailApi.clearCache({ albumId });
      albumPhotosApi.clearCache({ albumId });
    }, 1000);
  },
});

export default albumDeleteApi;
