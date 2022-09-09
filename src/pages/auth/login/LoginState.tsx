import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface State {
  showCaptcha: boolean;
  captcha: string | null;
};

const initialState: State = {
  showCaptcha: false,
  captcha: null,
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  }
});

export default slice;

export const LoginActions = slice.actions;
