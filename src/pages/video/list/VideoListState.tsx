import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VideoSort } from 'src/model/video';

interface State {
  page: number;
};

const initialState: State = {
  page: 0,
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
