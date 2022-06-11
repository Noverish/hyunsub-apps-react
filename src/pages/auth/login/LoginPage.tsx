import cs from 'classnames';
import { lazy, Suspense, useEffect } from "react";
import { Container } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'src/redux';
import { login } from './LoginContext';

const VantaGlobe = lazy(() => import('src/components/vanta/VantaGlobe'));

export interface LoginFormState {
  username: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errMsg } = useSelector(s => s.auth.login);

  const { register, handleSubmit } = useForm<LoginFormState>({ defaultValues: { remember: true } });

  const onSubmit: SubmitHandler<LoginFormState> = (state: LoginFormState) => {
    dispatch(login(navigate, state));
  };

  useEffect(() => {
    document.title = '로그인';
  }, []);

  return (
    <div id="LoginPage">
      <Suspense>
        <VantaGlobe />
      </Suspense>
      <Container style={{ maxWidth: '375px' }}>
        <h1 className="text-center display-1">로그인</h1>
        <form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">아이디</label>
            <input type="text" className={cs('form-control', { 'is-invalid': errMsg })} {...register('username')} />
          </div>
          <div>
            <label className="form-label">비밀번호</label>
            <input type="password" className={cs('form-control', { 'is-invalid': errMsg })} {...register('password')} />
            <div className="invalid-feedback">{errMsg}</div>
          </div>
          <button type="submit" className="btn btn-primary">로그인</button>
          <div className="d-flex justify-content-between">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" {...register('remember')} />
              <label className="form-check-label">로그인 유지</label>
            </div>
            <div>
              <Link to={`/register${window.location.search}`} className="link-light">회원가입</Link>
            </div>
          </div>
        </form>
      </Container>
    </div>
  )
}
