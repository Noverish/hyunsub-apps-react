import { generateApi } from "../generate-api";
import { AxiosRequestConfig } from 'axios';
import AppConstant from 'src/utils/constants';

export interface FileUploadMultipartParams {
  sessionKey: string;
  files: File[];
}

export interface FileUploadMultipartResult {
  results: string[];
}

const fileUploadMultipartApi = generateApi<FileUploadMultipartParams, FileUploadMultipartResult>(params => {
  const formData = new FormData();
  formData.append('sessionKey', params.sessionKey);
  params.files.forEach(v => formData.append('files', v));

  return {
    url: AppConstant.file.HOST + `/upload/multipart`,
    method: 'POST',
    withCredentials: true,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    }
  } as AxiosRequestConfig;
})

export default fileUploadMultipartApi;
