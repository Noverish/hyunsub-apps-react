import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DriveFileInfo } from 'src/model/drive';

interface State {
  file?: DriveFileInfo;
  text?: string;
};

const initialState: State = {
};

const slice = createSlice({
  name: 'drive',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  }
});

export default slice.reducer;

export const DriveActions = slice.actions;
