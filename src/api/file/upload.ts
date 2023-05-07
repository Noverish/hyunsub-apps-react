import { AxiosProgressEvent } from 'axios';

import { generateApi } from 'src/api/generate-api';
import AppConstant from 'src/utils/constants';

interface UploadParams {
  file: File;
  progress?: (percent: number) => void;
}

interface UploadResult {
  nonce: string;
}

const uploadApi = generateApi<UploadParams, UploadResult>((params) => ({
  url: AppConstant.file.HOST + '/upload/public',
  method: 'POST',
  withCredentials: true,
  data: params.file,
  headers: {
    'Content-Type': 'application/octet-stream',
  },
  onUploadProgress: (e: AxiosProgressEvent) => {
    const total = e.total;
    if (total) {
      params.progress?.(Math.round((e.loaded / total) * 100));
    }
  },
}));

export default uploadApi;
