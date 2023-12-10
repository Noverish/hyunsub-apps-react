import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  videoRegisterResult?: any;
  videoRegisterToEntryResult?: any;
  videoMetadataScanResult?: any;
  videoEncodeResult?: any;
  videoRenameResult?: any;
  videoSubtitleUploadResult?: any;
  videoSubtitleSyncResult?: any;
  videoThumbnailResult?: any;

  showVideoEntryCreateModal: boolean;
}

const initialState: State = {
  showVideoEntryCreateModal: false,
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  },
});

export default slice;

export const VideoAdminActions = slice.actions;
