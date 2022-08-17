import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  showSearchModal: boolean;
};

const initialState: State = {
  showSearchModal: false,
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  }
});

export default slice;

export const VideoSearchActions = slice.actions;
