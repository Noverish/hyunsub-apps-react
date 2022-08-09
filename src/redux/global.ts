import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
}

const initialState: State ={
  loading: false,
}

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  }
});

export default slice.reducer;

export const GlobalActions = slice.actions;