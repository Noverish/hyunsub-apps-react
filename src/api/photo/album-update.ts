import { generateApi } from '../generate-api';
import albumListApi from './album-list';

export interface AlbumThumbnailParams {
  albumId: string;
  thumbnailId?: string;
  name?: string;
}

const albumUpdateApi = generateApi<AlbumThumbnailParams, any>({
  api: (params) => ({
    url: `/api/v1/albums/${params.albumId}/thumbnail`,
    method: 'POST',
    data: params,
  }),
  postHandle: () => {
    albumListApi.clearCache();
  },
});

export default albumUpdateApi;
