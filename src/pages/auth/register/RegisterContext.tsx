import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { NavigateFunction } from "react-router-dom";
import registerApi, { RegisterParams } from 'src/api/auth/register';
import rsaKey from "src/api/auth/rsa-key";
import getErrMsg from "src/i18n/server-error";
import { ErrorResponse } from "src/model/api";
import routes from 'src/pages/auth/AuthRoutes';
import { RootState } from 'src/redux';
import { encrypt } from "src/utils/rsa-key";
import { updateRegisterPageState } from './RegisterState';

export const register = (t: TFunction, navigate: NavigateFunction, params: RegisterParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    const { publicKey } = await rsaKey();

    const registerParams: RegisterParams = {
      username: encrypt(publicKey, params.username),
      password: encrypt(publicKey, params.password),
    }

    await registerApi(registerParams);
    alert(t('auth.msg.register-success'));
    navigate(routes.login);
  } catch (ex) {
    const err = (ex as AxiosError<ErrorResponse>).response?.data!!;
    const errMsg = getErrMsg(t, err);
    dispatch(updateRegisterPageState({ errMsg }));
  }
}

export const dummy = () => async (dispatch: Dispatch, getState: () => RootState) => {

};
