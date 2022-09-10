import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
};

const initialState: State = {
};

const slice = createSlice({
  name: 'albumDetail',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  }
});

export default slice;

export const AlbumDetailActions = slice.actions;
