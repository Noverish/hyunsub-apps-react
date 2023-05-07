import { DriveUploadStatus } from 'src/model/drive';
import { generateStateContext } from 'src/utils/context';

interface State {
  items: DriveUploadStatus[];
  progress: number;
  controller?: AbortController;
  aborted: boolean;
}

const initialState: State = {
  items: [],
  progress: 0,
  aborted: false,
};

export const [DriveUploadContext, DriveUploadProvider] = generateStateContext<State>(initialState);
