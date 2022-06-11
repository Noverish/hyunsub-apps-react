import cs from 'classnames';
import { lazy, Suspense, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'src/redux';
import { register as doRegister } from './RegisterContext';

const VantaNet = lazy(() => import('src/components/vanta/VantaNet'));

export interface RegisterFormState {
  username: string;
  password1: string;
  password2: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errMsg } = useSelector(s => s.auth.register);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormState>();
  const passwordRef = useRef<string>();
  passwordRef.current = watch('password1');

  const onSubmit: SubmitHandler<RegisterFormState> = (state: RegisterFormState) => {
    dispatch(doRegister(navigate, { username: state.username, password: state.password1 }));
  };

  useEffect(() => {
    document.title = '회원가입';
  }, []);
  
  const usernameRegister = register('username', {
    required: '아이디를 입력해주세요',
    minLength: { value: 4, message: '아이디는 4글자 이상이어야 합니다' },
    maxLength: { value: 20, message: '아이디는 20글자 이하이어야 합니다' },
    pattern: { value: /^[A-Za-z0-9]+$/, message: '아이디는 알파벳 또는 숫자로만 이루어져 있어야 합니다.' },
  });

  const passwordRegister1 = register('password1', {
    required: '비밀번호를 입력해주세요',
    minLength: { value: 8, message: '비밀번호는 8글자 이상이어야 합니다' },
    maxLength: { value: 20, message: '아이디는 20글자 이하이어야 합니다' },
  });

  const passwordRegister2 = register('password2', {
    required: '비밀번호를 입력해주세요',
    validate: v => v === passwordRef.current || '비밀번호가 서로 다릅니다',
  });

  return (
    <div id="RegisterPage">
      <Suspense>
        <VantaNet />
      </Suspense>
      <Container style={{ maxWidth: '375px' }}>
        <h1 className="text-center display-1">회원가입</h1>
        <form className="d-grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">아이디</label>
            <input type="text" className={cs('form-control', { 'is-invalid': errors.username?.message })} {...usernameRegister} />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div>
            <label className="form-label">비밀번호</label>
            <input type="password" className={cs('form-control', { 'is-invalid': errors.password1?.message })} {...passwordRegister1} />
            <div className="invalid-feedback">{errors.password1?.message}</div>
          </div>
          <div>
            <label className="form-label">비밀번호 재입력</label>
            <input type="password" className={cs('form-control', { 'is-invalid': errors.password2?.message })} {...passwordRegister2} />
            <div className="invalid-feedback">{errors.password2?.message}</div>
          </div>
          <button type="submit" className="btn btn-primary">회원가입</button>
        </form>
      </Container>
    </div>
  )
}
