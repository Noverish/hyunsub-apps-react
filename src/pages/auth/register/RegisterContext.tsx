import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { NavigateFunction } from "react-router-dom";
import registerApi, { RegisterParams } from 'src/api/auth/register';
import getErrMsg from "src/i18n/server-error";
import { ErrorResponse } from "src/model/api";
import { RootState } from 'src/redux';
import RegisterPageState from './RegisterState';

export const register = (t: TFunction, navigate: NavigateFunction, params: RegisterParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    await registerApi(params);
    alert(t('auth.msg.register-success'));
    navigate('/login');
  } catch (ex) {
    const err = (ex as AxiosError<ErrorResponse>).response?.data!!;
    const errMsg = getErrMsg(t, err);
    dispatch(RegisterPageState.actions.update({ errMsg }));
  }
}

export const dummy = () => async (dispatch: Dispatch, getState: () => RootState) => {

};
