import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import loginApi from 'src/api/auth/login';
import { ErrorResponse } from "src/model/api";
import { RootState } from 'src/redux';
import { LoginFormState } from "./LoginPage";
import LoginPageState from './LoginState';

export const login = (navigate: NavigateFunction, state: LoginFormState) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    await loginApi(state);
    navigate('/my');
  } catch (ex) {
    const errMsg = (ex as AxiosError<ErrorResponse>).response?.data.msg;
    dispatch(LoginPageState.actions.update({ errMsg }));
  }
}

export const dummy = () => async (dispatch: Dispatch, getState: () => RootState) => {

};
