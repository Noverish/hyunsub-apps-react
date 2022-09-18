import AppConstant from 'src/utils/constants';
import { generateApi } from 'src/api/generate-api';

interface UploadParams {
  file: File;
  progress?: (percent: number) => void;
}

interface UploadResult {
  nonce: string;
}

const uploadApi = generateApi<UploadParams, UploadResult>(params => ({
  url: AppConstant.file.HOST + '/upload/public',
  method: 'POST',
  withCredentials: true,
  data: params.file,
  headers: {
    'Content-Type': 'application/octet-stream',
  },
  onUploadProgress: (e: ProgressEvent) => {
    params.progress?.(Math.round((e.loaded / e.total) * 100));
  }
}));

export default uploadApi;
