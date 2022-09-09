import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { NavigateFunction } from "react-router-dom";
import validUrl from "src/api/auth/auth/valid-url";
import loginApi, { LoginError, LoginParams } from 'src/api/auth/auth/login';
import rsaKey from "src/api/auth/auth/rsa-key";
import t from 'src/i18n';
import { ErrorResponse } from "src/model/api";
import routes from 'src/pages/auth/AuthRoutes';
import { RootState } from 'src/redux';
import { GlobalActions } from "src/redux/global";
import { encrypt } from "src/utils/rsa-key";
import { LoginFormState } from "./LoginPage";
import { LoginActions } from "./LoginState";

interface LoginParameter {
  navigate: NavigateFunction;
  state: LoginFormState;
  captcha?: string;
  captchaObj?: ReCAPTCHA;
  url: string;
}

export const login = (params: LoginParameter) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { navigate, state, captcha, captchaObj, url } = params;
  dispatch(GlobalActions.update({ loading: true }));

  const { publicKey } = await rsaKey();

  const loginParams: LoginParams = {
    username: encrypt(publicKey, state.username),
    password: encrypt(publicKey, state.password),
    remember: state.remember,
    captcha,
  }

  try {
    await loginApi(loginParams);
    if (url) {
      if (url.startsWith('https://')) {
        window.location.href = url;
      } else {
        navigate(url);
      }
    } else {
      navigate(routes.my);
    }
  } catch (err) {
    const payload = ((err as AxiosError<ErrorResponse>).response?.data.payload as LoginError);
    if (payload.needCaptcha) {
      captchaObj?.reset();
      dispatch(LoginActions.update({ showCaptcha: payload.needCaptcha }));
    }
  }

  dispatch(GlobalActions.update({ loading: false }));
}

interface ValidUrlActionParam {
  navigate: NavigateFunction;
  url: string;
}

export const validUrlAction = (params: ValidUrlActionParam) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { navigate, url } = params;
  const { valid } = await validUrl.fetch({ url });
  if (!valid) {
    dispatch(GlobalActions.update({ errMsg: t('auth.api.valid-url.failure') }));
    navigate('/error');
  }
}
