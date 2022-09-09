import AppConstant from 'src/utils/constants';
import { generateQuery } from 'src/api/generate-api';

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
  key: (path: string) => ['readdirDetail', path],
})

export default readdirDetail;
