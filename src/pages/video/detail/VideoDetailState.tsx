import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VideoThumbnailResult } from 'src/api/video/video-thumbnail';

interface State {
  showSetting: boolean;
  showAdmin: boolean;
  scanMetadataResult?: any;
  videoThumbnailResult?: VideoThumbnailResult;
  videoSubtitleUploadresult?: any;
  videoRenameResult?: any;
  videoEncodeResult?: any;
  subtitleSync: { [subtitleUrl: string]: number };
};

const initialState: State = {
  showSetting: false,
  showAdmin: false,
  subtitleSync: {},
};

const slice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
    setSubtitleSyncSetting: (state: State, { payload }: PayloadAction<{ [subtitleUrl: string]: number }>) => {
      Object.entries(payload).forEach(([subtitleUrl, sync]) => {
        state.subtitleSync[subtitleUrl] = sync;
      })
    }
  }
});

export default slice;

export const VideoDetailActions = slice.actions;
