import { generateApi } from '../generate-api';
import { AlbumPreview } from 'src/model/photo';

export interface AlbumCreateParams {
  name: string;
}

const albumCreateApi = generateApi<AlbumCreateParams, AlbumPreview>({
  api: (params) => ({
    url: `/api/v2/albums`,
    method: 'POST',
    data: params,
  }),
});

export default albumCreateApi;
