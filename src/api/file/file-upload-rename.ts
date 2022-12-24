import { generateApi } from "../generate-api";
import AppConstant from 'src/utils/constants';

export interface FileUploadRenameParams {
  nonce: string;
  path: string;
}

const fileUploadRenameApi = generateApi<FileUploadRenameParams, any>(params => ({
  url: AppConstant.file.HOST + '/upload/rename',
  method: 'POST',
  withCredentials: true,
  data: params,
}));

export default fileUploadRenameApi;
