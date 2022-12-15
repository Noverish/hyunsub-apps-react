import { generateApi } from "../generate-api";
import AppConstant from 'src/utils/constants';

export interface FileRemoveParams {
  path: string;
}

const fileRemoveApi = generateApi<FileRemoveParams, any>(params => ({
  url: AppConstant.file.HOST + '/api/fs/remove',
  method: 'POST',
  withCredentials: true,
  data: params,
}));

export default fileRemoveApi;
