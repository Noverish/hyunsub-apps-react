import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import loginApi, { LoginError, LoginParams } from 'src/api/auth/auth/login';
import rsaKey from "src/api/auth/auth/rsa-key";
import validUrl from "src/api/auth/auth/valid-url";
import { t } from 'i18next';
import { ErrorResponse } from "src/model/api";
import routes from 'src/pages/auth/AuthRoutes';
import { RootState } from 'src/redux';
import { GlobalActions } from "src/redux/global";
import { insertToast } from 'src/redux/toast';
import { encrypt } from "src/utils/rsa-key";
import router from 'src/pages/router';
import { LoginFormState } from "./LoginPage";
import { LoginActions } from "./LoginState";

interface LoginParameter {
  state: LoginFormState;
  captchaObj: ReCAPTCHA | null;
}

export const loginAction = (params: LoginParameter) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { state, captchaObj } = params;

  const { captcha, showCaptcha } = getState().auth.login;
  if (!captcha && showCaptcha) {
    dispatch(insertToast(t('auth.errMsg.captcha-required')));
    return;
  }

  dispatch(GlobalActions.update({ loading: true }));

  const { publicKey } = await rsaKey({});

  const loginParams: LoginParams = {
    username: encrypt(publicKey, state.username),
    password: encrypt(publicKey, state.password),
    remember: state.remember,
    captcha,
  }

  try {
    await loginApi(loginParams);

    const url = (new URLSearchParams(window.location.search)).get('url');
    if (url) {
      if (url.startsWith('https://')) {
        window.location.href = url;
      } else {
        router.navigate(url);
      }
    } else {
      router.navigate(routes.my);
    }
  } catch (err) {
    const payload = ((err as AxiosError<ErrorResponse>).response?.data.payload as LoginError);
    if (payload.needCaptcha) {
      captchaObj?.reset();
      dispatch(LoginActions.update({ showCaptcha: payload.needCaptcha, captcha: null }));
    }
  }

  dispatch(GlobalActions.update({ loading: false }));
}

interface ValidUrlActionParam {
  url: string;
}

export const validUrlAction = (params: ValidUrlActionParam) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { url } = params;
  const { valid } = await validUrl.fetch({ url });
  if (!valid) {
    dispatch(GlobalActions.update({ errMsg: t('auth.api.valid-url.failure') as string }));
    router.navigate('/error');
  }
}
