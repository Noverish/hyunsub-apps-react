import { PhotoPreview } from 'src/model/photo';
import { generateContext } from 'src/utils/context';

export interface PhotoUploadFileItem {
  file: File;
  path: string;
  status: 'ready' | 'uploading' | 'registering' | 'success' | 'error';
  progress: number;
  errMsg?: string;
  preview?: PhotoPreview;
}

interface State {
  items: PhotoUploadFileItem[];
  uploading: boolean;
  progress: number;
}

const initialState: State = {
  items: [],
  progress: 0,
  uploading: false,
};

export const [PhotoUploadContext, PhotoUploadProvider] = generateContext(initialState);
