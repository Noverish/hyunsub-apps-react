import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  captcha: string | null;
}

const initialState: State = {
  captcha: null,
};

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  },
});

export default slice;

export const RegisterActions = slice.actions;
