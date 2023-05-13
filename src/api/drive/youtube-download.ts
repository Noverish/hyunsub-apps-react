import { generateApi } from 'src/api/generate-api';

export interface YoutubeDownloadParams {
  url: string;
  path: string;
  resolution?: number;
}

export interface YoutubeDownloadResult {
  nonce: string;
}

const youtubeDownloadApi = generateApi<YoutubeDownloadParams, YoutubeDownloadResult>((params) => ({
  url: '/api/v1/youtube/download',
  method: 'POST',
  data: params,
}));

export default youtubeDownloadApi;