import { generateContext } from 'src/utils/context';

export interface PhotoUploadFileItem {
  file: File;
  path: string;
  status: 'ready' | 'uploading' | 'registering' | 'success' | 'error';
  errMsg?: string;
}

interface State {
  items: PhotoUploadFileItem[];
  uploading: boolean;
}

const initialState: State = {
  items: [],
  uploading: false,
};

export const [PhotoUploadContext, PhotoUploadProvider] = generateContext(initialState);
