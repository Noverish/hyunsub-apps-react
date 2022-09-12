import { AxiosRequestConfig } from 'axios';
import { generateApi } from 'src/api/generate-api';
import { Photo } from 'src/model/photo';

export interface AlbumUploadParams {
  albumId: number;
  file: File;
  progressCallback?: (percent: number) => void;
}

const albumUploadApi = generateApi<AlbumUploadParams, Photo>(params => {
  const formData = new FormData();
  formData.append('file', params.file);

  return {
    url: `/api/v1/albums/${params.albumId}/photos`,
    method: 'POST',
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (e: ProgressEvent) => {
      params.progressCallback?.(Math.round((e.loaded / e.total) * 100));
    }
  } as AxiosRequestConfig;
})

export default albumUploadApi;
