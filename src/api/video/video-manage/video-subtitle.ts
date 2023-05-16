import { AxiosRequestConfig } from 'axios';

import { generateApi } from 'src/api/generate-api';

export interface VideoSubtitleParams {
  videoId: string;
  lang: string;
  file?: FileList;
  path?: string;
  override: boolean;
}

const videoSubtitleApi = generateApi<VideoSubtitleParams, any>((params) => {
  const formData = new FormData();
  formData.append('lang', params.lang);
  formData.append('override', params.override.toString());
  if (params.file) {
    formData.append('file', params.file[0]);
  }
  if (params.path) {
    formData.append('path', params.path);
  }

  return {
    url: `/api/v1/videos/${params.videoId}/manage/subtitle`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } as AxiosRequestConfig;
});

export default videoSubtitleApi;
