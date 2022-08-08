import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VideoEntry } from 'src/model/video';

interface State {
  showSetting: boolean;
};

const initialState: State = {
  showSetting: false,
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
