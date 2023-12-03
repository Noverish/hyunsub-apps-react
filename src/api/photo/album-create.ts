import { generateApi } from '../generate-api';
import albumDetailApi from './album-detail';
import albumListApi from './album-list';
import { Album } from 'src/model/photo';

export interface AlbumCreateParams {
  name: string;
}

const albumCreateApi = generateApi<AlbumCreateParams, Album>({
  api: (params) => ({
    url: `/api/v1/albums`,
    method: 'POST',
    data: params,
  }),
  postHandle: (result) => {
    const albumId = result.id;
    albumDetailApi.setCache({ albumId }, result);
    albumListApi.clearCache();
  },
});

export default albumCreateApi;
