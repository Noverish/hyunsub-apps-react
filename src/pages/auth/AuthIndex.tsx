import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorPage from '../common/ErrorPage';
import routes from './AuthRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const LoginPage = lazy(() => import('src/pages/auth/login/LoginPage'));
const RegisterPage = lazy(() => import('src/pages/auth/register/RegisterPage'));
const MyPage = lazy(() => import('src/pages/auth/my/MyPage'));
const AuthAdminPage = lazy(() => import('src/pages/auth/admin/AuthAdminPage'));

export default function AuthIndex() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to={routes.my} />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.my} element={<MyPage />} />
        <Route path={routes.admin} element={<AuthAdminPage />} />
      </Routes>
    </>
  )
}
