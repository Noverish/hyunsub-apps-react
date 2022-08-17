import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VideoThumbnailResult } from 'src/api/video/video-thumbnail';

interface State {
  showSetting: boolean;
  showAdmin: boolean;
  scanMetadataResult?: any;
  videoThumbnailResult?: VideoThumbnailResult;
};

const initialState: State = {
  showSetting: false,
  showAdmin: false,
};

const slice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  }
});

export default slice;

export const VideoDetailActions = slice.actions;
