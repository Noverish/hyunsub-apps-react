import { generateApi } from '../generate-api';
import { SimpleResponse } from 'src/model/api';

interface AlbumPhotoRegisterParams {
  albumId: string;
  photoIds: string[];
}

const albumPhotoRegisterApi = generateApi<AlbumPhotoRegisterParams, SimpleResponse>({
  api: (params) => {
    return {
      url: `/api/v2/albums/${params.albumId}/photos`,
      method: 'POST',
      data: params,
    };
  },
});

export default albumPhotoRegisterApi;
