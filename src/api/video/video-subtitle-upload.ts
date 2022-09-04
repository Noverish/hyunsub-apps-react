import { AxiosRequestConfig } from 'axios';
import { generateApiV2 } from '../generate-api-v2';

export interface VideoSubtitleUploadParams {
  videoId: string;
  file: File;
  lang: string;
}

const videoSubtitleUpload = generateApiV2<VideoSubtitleUploadParams, any>(params => {
  const formData = new FormData();
  formData.append('lang', params.lang);
  formData.append('file', params.file);

  return {
    url: `/api/v1/video/${params.videoId}/subtitle`,
    method: 'POST',
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    }
  } as AxiosRequestConfig;
})

export default videoSubtitleUpload;
