import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MyPageUserInfo } from 'src/api/auth/my-page-user-info';

interface State {
  userInfo?: MyPageUserInfo;
  showUsernameModal: boolean;
  showPasswordModal: boolean;
}

const initialState: State = {
  showUsernameModal: false,
  showPasswordModal: false,
};

const slice = createSlice({
  name: 'my',
  initialState,
  reducers: {
    update: (state: State, { payload }: PayloadAction<Partial<State>>) => ({
      ...state,
      ...payload,
    }),
  },
});

export default slice;

export const updateMyPageState = slice.actions.update;
