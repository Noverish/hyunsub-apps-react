import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  errMsg: string;
};

const initialState: State = {
  errMsg: '',
};

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  }
});

export default slice;

export const updateRegisterPageState = slice.actions.update;
