import { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import AppConstant from 'src/utils/constants';
import { generateApi } from "../generate-api";
import { encodeURI, decode } from 'js-base64';

export interface FileUploadParams {
  files: File[];
  progress?: (status: FileUploadStatus) => void;
  callback?: (result: FileUploadResult) => void;
}

export interface FileUploadResult {
  i: number;
  nonce: string;
  fileName: string;
  mimeType: string;
}

export interface FileUploadStatus {
  current: {
    index: number;
    size: number;
    uploaded: number;
    ratio: number;
  };
  total: {
    size: number;
    uploaded: number;
    ratio: number;
  }
}

const pathNonce = Math.random().toString(36).substring(2, 8);
const url = AppConstant.file.HOST + `/upload/multipart/${pathNonce}`

const fileUploadInner = generateApi<FileUploadParams, FileUploadResult>(params => {
  const { files, progress } = params;

  const formData = new FormData();
  files.forEach((v, i) => formData.append('files', v, encodeURI(v.name)));

  const sizes2 = files.map((file) => file.size + encodeURI(file.name).length + file.type.toString().length + 121);
  const sizes = [0, ...sizes2];
  for (let i = 1; i < sizes.length; i++) {
    sizes[i] += sizes[i - 1];
  }
  sizes[sizes.length - 1] += 44;

  return {
    url,
    method: 'POST',
    withCredentials: true,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (e: AxiosProgressEvent) => {
      const total = e.total;
      if (!total || !progress) {
        return;
      }

      const now = e.loaded;
      const i = sizes.findIndex((v) => v >= now) - 1;
      const size = sizes[i + 1] - sizes[i];
      const diff = now - sizes[i];
      const ratio = Math.floor(diff / size * 100);
      const status: FileUploadStatus = {
        current: {
          index: i,
          size,
          uploaded: diff,
          ratio: ratio,
        },
        total: {
          size: total,
          uploaded: now,
          ratio: Math.floor(now / total * 100),
        }
      };
      progress(status);
    }
  } as AxiosRequestConfig;
});

export default async function fileUploadApi(params: FileUploadParams) {
  const es = new EventSource(url, { withCredentials: true });
  es.onmessage = (event: MessageEvent<string>) => {
    const result = JSON.parse(event.data);
    result.fileName = decode(result.fileName);
    params.callback?.(result);
  }

  await fileUploadInner(params);

  es.close();
}
