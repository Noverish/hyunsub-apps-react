import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { NavigateFunction } from "react-router-dom";
import loginApi, { LoginParams } from 'src/api/auth/login';
import rsaKey from "src/api/auth/rsa-key";
import getErrMsg from "src/i18n/server-error";
import { ErrorResponse } from "src/model/api";
import routes from 'src/pages/auth/AuthRoutes';
import { RootState } from 'src/redux';
import { encrypt } from "src/utils/rsa-key";
import { LoginFormState } from "./LoginPage";
import LoginPageState from './LoginState';

export const login = (t: TFunction, navigate: NavigateFunction, state: LoginFormState) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    const { publicKey } = await rsaKey();

    const loginParams: LoginParams = {
      username: encrypt(publicKey, state.username),
      password: encrypt(publicKey, state.password),
      remember: state.remember,
    }

    await loginApi(loginParams);
    navigate(routes.my);
  } catch (ex) {
    const err = (ex as AxiosError<ErrorResponse>).response?.data!!;
    const errMsg = getErrMsg(t, err);
    dispatch(LoginPageState.actions.update({ errMsg }));
  }
}

export const dummy = () => async (dispatch: Dispatch, getState: () => RootState) => {

};
