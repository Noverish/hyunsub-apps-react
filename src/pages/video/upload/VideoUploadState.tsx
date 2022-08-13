import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  result?: any;
};

const initialState: State = {
};

const slice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  }
});

export default slice;

export const VideoUploadActions = slice.actions;
