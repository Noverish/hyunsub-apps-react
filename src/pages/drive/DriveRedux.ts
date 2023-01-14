import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DriveFileInfo, DriveUploadStatus, DriveWindowStatus } from 'src/model/drive';

interface State {
  uploadStatus?: DriveUploadStatus;
  renames: DriveFileInfo[];
  newFolderModalIndex?: number;
  renameModalPath?: string;
  status: DriveWindowStatus[];
};

const initialState: State = {
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
    addUploadTotalSize: (state: State, { payload }: PayloadAction<number>) => {
      const status = state.uploadStatus || { total: 0, curr: 0 };
      status.total += payload;
      state.uploadStatus = status;
    },
    addUploadCurrSize: (state: State, { payload }: PayloadAction<number>) => {
      const status = state.uploadStatus || { total: 0, curr: 0 };
      status.curr += payload;
      state.uploadStatus = status;
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
