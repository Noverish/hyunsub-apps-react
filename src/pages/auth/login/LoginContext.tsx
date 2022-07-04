import { Dispatch } from "@reduxjs/toolkit";
import { TFunction } from "i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { NavigateFunction } from "react-router-dom";
import loginApi, { LoginError, LoginParams } from 'src/api/auth/login';
import rsaKey from "src/api/auth/rsa-key";
import { ErrorResponse } from "src/model/api";
import routes from 'src/pages/auth/AuthRoutes';
import { RootState } from 'src/redux';
import { encrypt } from "src/utils/rsa-key";
import { LoginFormState } from "./LoginPage";
import { LoginActions } from "./LoginState";

interface LoginParameter {
  t: TFunction;
  navigate: NavigateFunction;
  state: LoginFormState;
  captcha?: string;
  captchaObj?: ReCAPTCHA;
}

export const login = ({ t, navigate, state, captcha, captchaObj }: LoginParameter) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { publicKey } = await rsaKey(dispatch);

  const loginParams: LoginParams = {
    username: encrypt(publicKey, state.username),
    password: encrypt(publicKey, state.password),
    remember: state.remember,
    captcha,
  }

  try {
    await loginApi(loginParams, dispatch, t);
    navigate(routes.my);
  } catch (err) {
    const payload = ((err as ErrorResponse).payload as LoginError);
    if (payload.needCaptcha) {
      captchaObj?.reset();
      dispatch(LoginActions.update({ showCaptcha: payload.needCaptcha }));
    }
  }
}
