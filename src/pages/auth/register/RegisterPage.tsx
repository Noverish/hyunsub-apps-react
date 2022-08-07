import cs from 'classnames';
import { lazy, Suspense, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'src/redux';
import routes from '../AuthRoutes';
import { register as doRegister } from './RegisterContext';

const VantaNet = lazy(() => import('src/components/vanta/VantaNet'));

export interface RegisterFormState {
  username: string;
  password1: string;
  password2: string;
}

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormState>();
  const passwordRef = useRef<string>();
  passwordRef.current = watch('password1');

  const onSubmit: SubmitHandler<RegisterFormState> = (state: RegisterFormState) => {
    dispatch(doRegister(t, navigate, { username: state.username, password: state.password1 }));
  };

  useEffect(() => {
    document.title = t('auth.register');
  }, [t]);

  const usernameRegister = register('username', {
    required: t('auth.errMsg.empty-id'),
    minLength: { value: 4, message: t('auth.errMsg.short-id') },
    maxLength: { value: 20, message: t('auth.errMsg.long-id') },
    pattern: { value: /^[A-Za-z0-9]+$/, message: t('auth.errMsg.wrong-pattern-id') },
  });

  const passwordRegister1 = register('password1', {
    required: t('auth.errMsg.empty-pw'),
    minLength: { value: 8, message: t('auth.errMsg.short-pw') },
    maxLength: { value: 20, message: t('auth.errMsg.long-pw') },
  });

  const passwordRegister2 = register('password2', {
    required: t('auth.errMsg.empty-pw'),
    validate: v => v === passwordRef.current || t('auth.errMsg.not-equal-pw'),
  });

  const usernameErrMsg = errors.username?.message;
  const password1ErrMsg = errors.password1?.message;
  const password2ErrMsg = errors.password2?.message;

  return (
    <div id="RegisterPage" className="h-100 flex_center">
      <Suspense>
        <VantaNet />
      </Suspense>
      <Container style={{ maxWidth: '375px' }}>
        <h1 className="text-center display-1">{t('auth.register')}</h1>
        <form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">{t('auth.id')}</label>
            <input type="text" className={cs('form-control', { 'is-invalid': usernameErrMsg })} {...usernameRegister} />
            <div className="invalid-feedback">{usernameErrMsg}</div>
          </div>
          <div>
            <label className="form-label">{t('auth.pw')}</label>
            <input type="password" className={cs('form-control', { 'is-invalid': password1ErrMsg })} {...passwordRegister1} />
            <div className="invalid-feedback">{password1ErrMsg}</div>
          </div>
          <div>
            <label className="form-label">{t('auth.pw-confirm')}</label>
            <input type="password" className={cs('form-control', { 'is-invalid': password2ErrMsg })} {...passwordRegister2} />
            <div className="invalid-feedback">{password2ErrMsg}</div>
          </div>
          <button type="submit" className="btn btn-primary">{t('auth.register')}</button>
          <div className="d-flex justify-content-end">
            <Link to={`${routes.login}${window.location.search}`} className="link-light">{t('auth.login')}</Link>
          </div>
        </form>
      </Container>
    </div>
  )
}
