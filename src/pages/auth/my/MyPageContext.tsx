import { Dispatch } from "@reduxjs/toolkit";
import getMyPageUserInfo from "src/api/auth/my-page-user-info";
import signOut from "src/api/auth/sign-out";
import { RootState } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { updateMyPageState } from './MyPageState';
import { t } from 'i18next';
import router from 'src/pages/router';
import AuthRoutes from '../AuthRoutes';

export function fetchMyPageUserInfo() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userInfo = await getMyPageUserInfo({});
    dispatch(updateMyPageState({ userInfo }));
  }
}

export const signOutAction = () => async (dispatch: Dispatch, getState: () => RootState) => {
  if (!window.confirm(t('auth.sign-out.confirm') as string)) {
    return;
  }

  dispatch(GlobalActions.update({ loading: true }));
  await signOut({});
  dispatch(GlobalActions.update({ loading: false }));

  alert(t('auth.sign-out.success'));
  router.navigate(AuthRoutes.login);
}
