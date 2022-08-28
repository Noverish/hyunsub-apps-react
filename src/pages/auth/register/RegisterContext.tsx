import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import registerApi, { RegisterParams } from 'src/api/auth/auth/register';
import rsaKey from "src/api/auth/auth/rsa-key";
import t from 'src/i18n';
import routes from 'src/pages/auth/AuthRoutes';
import { RootState } from 'src/redux';
import { GlobalActions } from "src/redux/global";
import { encrypt } from "src/utils/rsa-key";

interface RegisterActionParams {
  navigate: NavigateFunction;
  params: RegisterParams;
}

export const registerAction = (p: RegisterActionParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { navigate, params } = p;
  dispatch(GlobalActions.update({ loading: true }));

  const { publicKey } = await rsaKey(dispatch);

  const registerParams: RegisterParams = {
    username: encrypt(publicKey, params.username),
    password: encrypt(publicKey, params.password),
  }

  try {
    await registerApi(registerParams, dispatch);
  } catch (ex) {
    dispatch(GlobalActions.update({ loading: false }));
    return;
  }

  alert(t('auth.msg.register-success'));
  navigate(routes.login + '?' + window.location.search);

  dispatch(GlobalActions.update({ loading: false }));
}
