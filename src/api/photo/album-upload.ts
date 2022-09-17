import { generateApi } from 'src/api/generate-api';
import { Photo } from 'src/model/photo';

export interface AlbumUploadParams {
  albumId: number;
  nonce: string;
  fileName: string;
}

const albumUploadApi = generateApi<AlbumUploadParams, Photo>(params => ({
  url: `/api/v1/albums/${params.albumId}/photos`,
  method: 'POST',
  data: {
    nonce: params.nonce,
    fileName: params.fileName,
  },
}))

export default albumUploadApi;
