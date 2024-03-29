import cs from 'classnames';
import { lazy, Suspense, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'src/redux';
import AppConstant from 'src/utils/constants';
import routes from '../AuthRoutes';
import { loginAction, validUrlAction } from './LoginContext';
import { LoginActions } from './LoginState';

const VantaGlobe = lazy(() => import('src/components/vanta/VantaGlobe'));

export interface LoginFormState {
  username: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const captchaRef = useRef<ReCAPTCHA>(null);
  const { showCaptcha } = useSelector(s => s.auth.login);
  const url = searchParams.get('url') || '';

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormState>({ defaultValues: { remember: true } });

  const onSubmit: SubmitHandler<LoginFormState> = (state: LoginFormState) => {
    dispatch(loginAction({ state, captchaObj: captchaRef.current }));
  };

  const onCaptchaClick = (captcha: string | null) => {
    dispatch(LoginActions.update({ captcha }))
  };

  useEffect(() => {
    document.title = t('auth.login');
  }, [t]);

  useEffect(() => {
    dispatch(validUrlAction({ url }));
  }, [dispatch, url]);

  const usernameRegister = register('username', {
    required: t('auth.errMsg.empty-id') as string,
  });

  const passwordRegister = register('password', {
    required: t('auth.errMsg.empty-pw') as string,
  });

  const usernameErrMsg = errors.username?.message;
  const passwordErrMsg = errors.password?.message;

  return (
    <div id="LoginPage" className="vh-100 flex_center">
      <Suspense>
        <VantaGlobe />
      </Suspense>
      <Container style={{ maxWidth: '375px' }}>
        <h1 className="text-center display-1">{t('auth.login')}</h1>
        <form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">{t('auth.id')}</label>
            <input type="text" className={cs('form-control', { 'is-invalid': usernameErrMsg })} {...usernameRegister} />
            <div className="invalid-feedback">{usernameErrMsg}</div>
          </div>
          <div>
            <label className="form-label">{t('auth.pw')}</label>
            <input type="password" className={cs('form-control', { 'is-invalid': passwordErrMsg })} {...passwordRegister} />
            <div className="invalid-feedback">{passwordErrMsg}</div>
          </div>
          {showCaptcha && <ReCAPTCHA
            className='flex_center'
            ref={captchaRef}
            theme='dark'
            sitekey={AppConstant.RECAPTCHA_SITE_KEY}
            onChange={onCaptchaClick}
          />}
          <button type="submit" className="btn btn-primary">{t('auth.login')}</button>
          <div className="d-flex justify-content-between">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" {...register('remember')} />
              <label className="form-check-label">{t('auth.login-persist')}</label>
            </div>
            <div>
              <Link to={`${routes.register}${window.location.search}`} className="link-light">{t('auth.register')}</Link>
            </div>
          </div>
        </form>
      </Container>
    </div>
  )
}
