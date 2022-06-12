import { Dispatch } from "@reduxjs/toolkit";
import getMyPageUserInfo from "src/api/auth/my-page-user-info";
import { RootState } from 'src/redux';
import MyPageState from './MyPageState';

export function fetchMyPageUserInfo() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userInfo = await getMyPageUserInfo();
    dispatch(MyPageState.actions.update({ userInfo }));
  }
}
