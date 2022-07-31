import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  page: number;
  seed: number;
};

const initialState: State = {
  page: 0,
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
