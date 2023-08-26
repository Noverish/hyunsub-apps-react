import cs from 'classnames';
import { Suspense, lazy, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

import AuthRoutes from '../AuthRoutes';
import { validUrlAction } from '../login/LoginContext';
import { registerAction } from './RegisterContext';
import { RegisterActions } from './RegisterState';
import { useDispatch } from 'src/redux';
import AppConstant from 'src/utils/constants';

const VantaNet = lazy(() => import('src/components/vanta/VantaNet'));

export interface RegisterFormState {
  username: string;
  password1: string;
  password2: string;
}

export default function RegisterPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const captchaRef = useRef<ReCAPTCHA>(null);
  const url = searchParams.get('url') || '';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormState>();
  const passwordRef = useRef<string>();
  passwordRef.current = watch('password1');

  const onSubmit: SubmitHandler<RegisterFormState> = (state: RegisterFormState) => {
    dispatch(registerAction({ state, captchaObj: captchaRef.current }));
  };

  const onCaptchaClick = (captcha: string | null) => {
    dispatch(RegisterActions.update({ captcha }));
  };

  useEffect(() => {
    document.title = t('auth.register');
  }, [t]);

  useEffect(() => {
    dispatch(validUrlAction({ url }));
  }, [dispatch, url]);

  const usernameRegister = register('username', {
    required: t('auth.errMsg.empty-id') as string,
    minLength: { value: 4, message: t('auth.errMsg.short-id') },
    maxLength: { value: 20, message: t('auth.errMsg.long-id') },
    pattern: { value: /^[A-Za-z0-9]+$/, message: t('auth.errMsg.wrong-pattern-id') },
  });

  const passwordRegister1 = register('password1', {
    required: t('auth.errMsg.empty-pw') as string,
    minLength: { value: 8, message: t('auth.errMsg.short-pw') },
    maxLength: { value: 20, message: t('auth.errMsg.long-pw') },
  });

  const passwordRegister2 = register('password2', {
    required: t('auth.errMsg.empty-pw') as string,
    validate: (v) => v === passwordRef.current || (t('auth.errMsg.not-equal-pw') as string),
  });

  const usernameErrMsg = errors.username?.message;
  const password1ErrMsg = errors.password1?.message;
  const password2ErrMsg = errors.password2?.message;

  return (
    <div id="RegisterPage" className="vh-100 flex_center">
      <Suspense>
        <VantaNet />
      </Suspense>
      <Container style={{ maxWidth: '375px' }}>
        <h1 className="text-center display-1">{t('auth.register')}</h1>
        <form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">{t('auth.id')}</label>
            <input
              type="text"
              className={cs('form-control', { 'is-invalid': usernameErrMsg })}
              {...usernameRegister}
              autoCapitalize="none"
            />
            <div className="invalid-feedback">{usernameErrMsg}</div>
          </div>
          <div>
            <label className="form-label">{t('auth.pw')}</label>
            <input
              type="password"
              className={cs('form-control', { 'is-invalid': password1ErrMsg })}
              {...passwordRegister1}
            />
            <div className="invalid-feedback">{password1ErrMsg}</div>
          </div>
          <div>
            <label className="form-label">{t('auth.pw-confirm')}</label>
            <input
              type="password"
              className={cs('form-control', { 'is-invalid': password2ErrMsg })}
              {...passwordRegister2}
            />
            <div className="invalid-feedback">{password2ErrMsg}</div>
          </div>
          <ReCAPTCHA
            className="flex_center"
            ref={captchaRef}
            theme="dark"
            sitekey={AppConstant.RECAPTCHA_SITE_KEY}
            onChange={onCaptchaClick}
          />
          <button type="submit" className="btn btn-primary">
            {t('auth.register')}
          </button>
          <div className="d-flex justify-content-end">
            <Link to={`${AuthRoutes.login}${window.location.search}`} className="link-light">
              {t('auth.login')}
            </Link>
          </div>
        </form>
      </Container>
    </div>
  );
}
