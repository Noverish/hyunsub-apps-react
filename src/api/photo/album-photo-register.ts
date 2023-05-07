import { generateApi } from '../generate-api';

interface AlbumPhotoRegisterParams {
  albumId: string;
  photoIds: string[];
}

const albumPhotoRegisterApi = generateApi<AlbumPhotoRegisterParams, any>((params) => {
  const { albumId, ...data } = params;

  return {
    url: `/api/v2/albums/${albumId}/photos`,
    method: 'POST',
    data,
  };
});

export default albumPhotoRegisterApi;
