import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { NavigateFunction } from "react-router-dom";
import loginApi from 'src/api/auth/login';
import getErrMsg from "src/i18n/server-error";
import { ErrorResponse } from "src/model/api";
import { RootState } from 'src/redux';
import { LoginFormState } from "./LoginPage";
import LoginPageState from './LoginState';

export const login = (t: TFunction, navigate: NavigateFunction, state: LoginFormState) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    await loginApi(state);
    navigate('/my');
  } catch (ex) {
    const err = (ex as AxiosError<ErrorResponse>).response?.data!!;
    const errMsg = getErrMsg(t, err);
    dispatch(LoginPageState.actions.update({ errMsg }));
  }
}

export const dummy = () => async (dispatch: Dispatch, getState: () => RootState) => {

};
