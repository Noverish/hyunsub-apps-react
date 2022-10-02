import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VideoEntry } from 'src/model/video';

interface State {
  seed: number;
};

const initialState: State = {
  seed: Math.floor(new Date().getTime() / 1000),
};

const slice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  }
});

export default slice;

export const VideoListActions = slice.actions;
