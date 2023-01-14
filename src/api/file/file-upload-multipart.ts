import { generateApi } from "../generate-api";
import { AxiosRequestConfig, AxiosProgressEvent } from 'axios';
import AppConstant from 'src/utils/constants';

export interface FileUploadMultipartParams {
  path: string;
  files: File[];
  progress?: (curr: number, total: number) => void;
}

export interface FileUploadMultipartResult {
  results: string[];
}

const fileUploadMultipartApi = generateApi<FileUploadMultipartParams, FileUploadMultipartResult>(params => {
  const formData = new FormData();
  formData.append('path', params.path);
  params.files.forEach(v => formData.append('files', v));

  return {
    url: AppConstant.file.HOST + `/upload/multipart`,
    method: 'POST',
    withCredentials: true,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (e: AxiosProgressEvent) => {
      const total = e.total;
      if (total) {
        params.progress?.(e.loaded, total);
      }
    }
  } as AxiosRequestConfig;
})

export default fileUploadMultipartApi;
