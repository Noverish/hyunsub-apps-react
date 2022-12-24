import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DriveFileInfo, DriveUploadingFile, DriveWindowStatus } from 'src/model/drive';

interface State {
  uploads: DriveUploadingFile[];
  renames: DriveFileInfo[];
  newFolderModalIndex?: number;
  renameModalPath?: string;
  status: DriveWindowStatus[];
};

interface UpdateUploadPayload {
  path: string;
  progress: number;
}

const initialState: State = {
  uploads: [],
  renames: [],
  status: [],
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
    updateStatus: (state: State, { payload }: PayloadAction<Partial<DriveWindowStatus> & { index?: number }>) => {
      const { index = 0, ...newStatus } = payload;
      const status = state.status[index] || { path: '/', selects: [] };
      if (newStatus.path) {
        state.status[index] = { path: newStatus.path, selects: [] };
      } else {
        state.status[index] = { ...status, ...newStatus };
      }
      if (newStatus.lastSelect) {
        state.status[index].lastSelectTime = new Date().getTime();
      }
    },
  }
});

export default slice.reducer;

export const DriveActions = slice.actions;
