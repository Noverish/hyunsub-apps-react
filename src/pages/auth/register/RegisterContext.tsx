import { Dispatch } from '@reduxjs/toolkit';
import { t } from 'i18next';
import ReCAPTCHA from 'react-google-recaptcha';

import { RegisterFormState } from './RegisterPage';
import { RegisterActions } from './RegisterState';
import registerApi, { RegisterParams } from 'src/api/auth/auth/register';
import rsaKey from 'src/api/auth/auth/rsa-key';
import AuthRoutes from 'src/pages/auth/AuthRoutes';
import router from 'src/pages/router';
import { RootState } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import { insertToast } from 'src/redux/toast';
import { encrypt } from 'src/utils/rsa-key';

interface RegisterActionParams {
  state: RegisterFormState;
  captchaObj: ReCAPTCHA | null;
}

export const registerAction = (p: RegisterActionParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  const { state, captchaObj } = p;
  const { captcha } = getState().auth.register;

  if (!captcha) {
    dispatch(insertToast(t('auth.errMsg.captcha-required')));
    return;
  }

  dispatch(GlobalActions.update({ loading: true }));

  const { publicKey } = await rsaKey({});

  const registerParams: RegisterParams = {
    username: encrypt(publicKey, state.username),
    password: encrypt(publicKey, state.password1),
    captcha,
  };

  try {
    await registerApi(registerParams);

    alert(t('auth.msg.register-success'));
    router.navigate(AuthRoutes.login + '?' + window.location.search);
  } catch (ex) {
    captchaObj?.reset();
    dispatch(RegisterActions.update({ captcha: null }));
  }

  dispatch(GlobalActions.update({ loading: false }));
};
