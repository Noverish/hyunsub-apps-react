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
    url: `/api/v2/albums/${params.albumId}`,
    method: 'DELETE',
  }),
  postHandle: ({ id: albumId }) => {
    albumDetailApi.setCache({ albumId }, null);
    albumListApi.clearCache();
    setTimeout(() => {
      albumPhotosApi.clearCache({ albumId });
    }, 0);
  },
});

export default albumDeleteApi;
