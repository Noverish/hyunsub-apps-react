import { generateStateContext } from 'src/utils/context';

interface State {
  videoMetadataResult?: any;
  videoThumbnailResult?: any;
  videoEncodeResult?: any;
  videoRenameResult?: any;
  videoSubtitleSyncResult?: any;
  videoSubtitleUploadResult?: any;
}

const initialState: State = {};

export const [VideoManageContext, VideoManageProvider] = generateStateContext<State>(initialState);
