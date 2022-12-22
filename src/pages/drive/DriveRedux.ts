import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DriveFileInfo, DriveUploadingFile } from 'src/model/drive';

interface State {
  file?: DriveFileInfo;
  text?: string;
  uploads: DriveUploadingFile[];
  renames: DriveFileInfo[];
  showNewFolderModal: boolean;
};

interface UpdateUploadPayload {
  path: string;
  progress: number;
}

const initialState: State = {
  uploads: [],
  renames: [],
  showNewFolderModal: false,
};

const slice = createSlice({
  name: 'drive',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
    updateUpload: (state: State, { payload }: PayloadAction<UpdateUploadPayload>) => {
      const current = state.uploads.filter(v => v.path === payload.path)[0];
      if (current) {
        current.progress = payload.progress;
      }
    },
  }
});

export default slice.reducer;

export const DriveActions = slice.actions;
