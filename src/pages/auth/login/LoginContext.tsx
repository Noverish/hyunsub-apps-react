import { Dispatch } from "@reduxjs/toolkit";
import { TFunction } from "i18next";
import { NavigateFunction } from "react-router-dom";
import loginApi, { LoginParams } from 'src/api/auth/login';
import rsaKey from "src/api/auth/rsa-key";
import routes from 'src/pages/auth/AuthRoutes';
import { RootState } from 'src/redux';
import { encrypt } from "src/utils/rsa-key";
import { LoginFormState } from "./LoginPage";

export const login = (t: TFunction, navigate: NavigateFunction, state: LoginFormState) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { publicKey } = await rsaKey(dispatch);

  const loginParams: LoginParams = {
    username: encrypt(publicKey, state.username),
    password: encrypt(publicKey, state.password),
    remember: state.remember,
  }

  await loginApi(loginParams, dispatch, t);

  navigate(routes.my);
}
