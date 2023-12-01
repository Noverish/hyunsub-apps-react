import { generateApi } from '../generate-api';

interface AlbumPhotoRegisterParams {
  albumId: string;
  photoIds: string[];
}

const albumPhotoRegisterApi = generateApi<AlbumPhotoRegisterParams, any>({
  api: (params) => {
    return {
      url: `/api/v2/albums/${params.albumId}/photos`,
      method: 'POST',
      data: params,
    };
  },
});

export default albumPhotoRegisterApi;
