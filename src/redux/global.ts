import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
  errMsg?: string;
}

const initialState: State = {
  loading: false,
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  },
});

export default slice.reducer;

export const GlobalActions = slice.actions;
