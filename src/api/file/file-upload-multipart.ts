import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { encodeURI } from 'js-base64';

import { FileUploadItemResult, FileUploadProgress, FileWithPath } from 'src/model/file';
import { generateRandomString } from 'src/utils';
import AppConstant from 'src/utils/constants';
import { calcFormDataSize, calcProgress } from 'src/utils/form-data';

export interface FileUploadParams {
  files: FileWithPath[];
  controller?: AbortController;
  progress?: (progress: FileUploadProgress) => void;
  callback?: (result: FileUploadItemResult) => void;
}

export interface FileUploadResult {
  result: FileUploadItemResult[];
}

export default async function fileUploadApi(params: FileUploadParams): Promise<FileUploadResult> {
  const nonce = generateRandomString(16);
  const url = AppConstant.file.HOST + `/upload/multipart/${nonce}`;

  const es = new EventSource(url, { withCredentials: true });

  es.addEventListener('data', (event: MessageEvent<string>) => {
    const data: FileUploadItemResult = JSON.parse(event.data);
    params.callback?.(data);
  });

  es.addEventListener('close', () => {
    es.close();
  });

  await waitReady(es);

  return await fileUpload(params, url);
}

function waitReady(es: EventSource) {
  return new Promise<void>((resolve) => {
    es.addEventListener('ready', () => {
      resolve();
    });
  });
}

const fileUpload = async (params: FileUploadParams, url: string): Promise<FileUploadResult> => {
  const { files, progress, controller } = params;

  const formData = new FormData();
  formData.append('length', files.length.toString());
  files.forEach((v) => formData.append('files', v.file, encodeURI(v.path)));

  const sizes = calcFormDataSize(files);

  const config: AxiosRequestConfig = {
    url,
    method: 'POST',
    withCredentials: true,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal: controller?.signal,
    onUploadProgress: (e: AxiosProgressEvent) => {
      if (!progress) {
        return;
      }

      const status = calcProgress(sizes, e);
      if (status) {
        progress(status);
      }
    },
  };

  return (await axios<FileUploadResult>(config)).data;
};
