import { AxiosError } from 'axios';
import cs from 'classnames';
import { lazy, Suspense, useState } from "react";
import { Container } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import login from 'src/api/auth/login';
import { ErrorReponse } from "src/model/api";

const VantaGlobe = lazy(() => import('src/components/vanta/VantaGlobe'));

interface LoginFormState {
  username: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormState>();
  const [error, setError] = useState<ErrorReponse>();

  const onSubmit: SubmitHandler<LoginFormState> = (state: LoginFormState) => {
    login(state)
      .then(res => console.log(res))
      .catch((err: AxiosError<ErrorReponse>) => setError(err.response?.data));
  };

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
            <input type="text" className={cs('form-control', { 'is-invalid': error })} {...register('username')} />
          </div>
          <div>
            <label className="form-label">비밀번호</label>
            <input type="password" className={cs('form-control', { 'is-invalid': error })} {...register('password')} />
            <div className="invalid-feedback">{error?.msg}</div>
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
