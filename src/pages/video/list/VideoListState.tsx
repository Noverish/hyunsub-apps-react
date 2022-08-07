import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VideoEntry } from 'src/model/video';

interface State {
  page: number;
  seed: number;
  entries: VideoEntry[];
  loading: boolean;
  noMorePage: boolean;
};

const initialState: State = {
  page: 0,
  seed: Math.floor(new Date().getTime() / 1000),
  entries: [],
  loading: false,
  noMorePage: false,
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
