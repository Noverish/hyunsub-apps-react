import { Dispatch } from "@reduxjs/toolkit";
import { TFunction } from "i18next";
import { NavigateFunction } from "react-router-dom";
import registerApi, { RegisterParams } from 'src/api/auth/register';
import rsaKey from "src/api/auth/rsa-key";
import routes from 'src/pages/auth/AuthRoutes';
import { RootState } from 'src/redux';
import { encrypt } from "src/utils/rsa-key";

export const register = (t: TFunction, navigate: NavigateFunction, params: RegisterParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { publicKey } = await rsaKey(dispatch);

  const registerParams: RegisterParams = {
    username: encrypt(publicKey, params.username),
    password: encrypt(publicKey, params.password),
  }

  await registerApi(registerParams, dispatch, t);

  alert(t('auth.msg.register-success'));
  navigate(routes.login);
}
