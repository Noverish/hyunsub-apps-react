import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Photo } from 'src/model/photo';

export interface PhotoUploadStatus {
  name: string;
  progress: number;
  photo?: Photo;
}

interface UpdateStatusPayload {
  status: Partial<PhotoUploadStatus>;
  index: number;
}

interface State {
  statusList: PhotoUploadStatus[];
};

const initialState: State = {
  statusList: [],
};

const slice = createSlice({
  name: 'albumUpload',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
    updateStatus: (state: State, { payload }: PayloadAction<UpdateStatusPayload>) => {
      const status = state.statusList[payload.index];
      state.statusList[payload.index] = { ...status, ...payload.status };
    }
  }
});

export default slice;

export const AlbumUploadActions = slice.actions;
