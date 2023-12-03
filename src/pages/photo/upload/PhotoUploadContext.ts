import { PhotoUploadItemInfo } from 'src/model/photo';
import { generateStateContext } from 'src/utils/context';

export type PhotoUploadStatus = 'ready' | 'uploading' | 'success' | 'error' | 'aborted';

interface State {
  status: PhotoUploadStatus;
  items: PhotoUploadItemInfo[];
  progress: number;
  controller?: AbortController;
}

const initialState: State = {
  status: 'ready',
  items: [],
  progress: 0,
};

export const [PhotoUploadContext, PhotoUploadProvider] = generateStateContext(initialState);
