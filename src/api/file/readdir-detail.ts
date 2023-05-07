import { generateQuery } from 'src/api/generate-api';
import AppConstant from 'src/utils/constants';

export interface FileInfo {
  path: string;
  mtime: number;
  size: number;
  isDir: boolean;
}

const readdirDetail = generateQuery<string, FileInfo[]>({
  api: (path: string) => ({
    url: AppConstant.file.HOST + '/api/fs/readdir/detail',
    method: 'GET',
    withCredentials: true,
    params: { path },
  }),
  key: () => 'readdirDetail',
});

export default readdirDetail;
