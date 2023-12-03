import { DriveUploadItemInfo } from 'src/model/drive';
import { generateStateContext } from 'src/utils/context';

export type DriveUploadStatus = 'ready' | 'uploading' | 'success' | 'error' | 'aborted';

interface State {
  status: DriveUploadStatus;
  items: DriveUploadItemInfo[];
  progress: number;
  controller?: AbortController;
}

const initialState: State = {
  status: 'ready',
  items: [],
  progress: 0,
};

export const [DriveUploadContext, DriveUploadProvider] = generateStateContext(initialState);
