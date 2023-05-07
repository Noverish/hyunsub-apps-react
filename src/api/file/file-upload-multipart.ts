import { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { decode, encodeURI } from 'js-base64';

import { generateApi } from '../generate-api';
import { FileUploadResult, FileUploadStatus, FileWithPath } from 'src/model/file';
import { sleep } from 'src/utils';
import AppConstant from 'src/utils/constants';
import { calcFormDataSize, calcProgress } from 'src/utils/form-data';

export interface FileUploadParams {
  files: FileWithPath[];
  controller?: AbortController;
  progress?: (status: FileUploadStatus) => void;
  callback?: (result: FileUploadResult) => void;
  errorCallback?: (status: FileUploadResult) => void;
}

const pathNonce = Math.random().toString(36).substring(2, 8);
const url = AppConstant.file.HOST + `/upload/multipart/${pathNonce}`;

const fileUpload = generateApi<FileUploadParams, FileUploadResult>((params) => {
  const { files, progress, controller } = params;

  const formData = new FormData();
  files.forEach((v) => formData.append('files', v.file, encodeURI(v.path)));

  const sizes = calcFormDataSize(files);

  return {
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
  } as AxiosRequestConfig;
});

export default async function fileUploadApi(params: FileUploadParams) {
  const es = new EventSource(url, { withCredentials: true });

  es.addEventListener('data', (event: MessageEvent<string>) => {
    const result = JSON.parse(event.data);
    result.fileName = decode(result.fileName);
    params.callback?.(result);
  });

  es.addEventListener('forbidden', (event: MessageEvent<string>) => {
    const result = JSON.parse(event.data);
    result.fileName = decode(result.fileName);
    params.errorCallback?.(result);
  });

  es.addEventListener('close', () => {
    es.close();
  });

  await waitReady(es);

  try {
    await fileUpload(params);
  } catch (ex) {}

  await sleep(1000);
}

function waitReady(es: EventSource) {
  return new Promise<void>((resolve) => {
    es.addEventListener('ready', () => {
      resolve();
    });
  });
}
