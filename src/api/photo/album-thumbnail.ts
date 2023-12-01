import { generateApi } from '../generate-api';
import { AlbumPreview } from 'src/model/photo';

export interface AlbumThumbnailParams {
  albumId: string;
  photoId: string;
}

const albumThumbnailApi = generateApi<AlbumThumbnailParams, AlbumPreview>({
  api: (params) => ({
    url: `/api/v2/albums/${params.albumId}/thumbnail`,
    method: 'POST',
    data: params,
  }),
});

export default albumThumbnailApi;
