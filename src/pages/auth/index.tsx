import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoadingPage from 'src/pages/LoadingPage';
import routes from './AuthRoutes';

const NotFoundPage = lazy(() => import('src/pages/NotFoundPage'));
const LoginPage = lazy(() => import('src/pages/auth/login/LoginPage'));
const RegisterPage = lazy(() => import('src/pages/auth/register/RegisterPage'));
const MyPage = lazy(() => import('src/pages/auth/MyPage'));

export default function AuthIndex() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Navigate to={routes.my} />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.register} element={<RegisterPage />} />
          <Route path={routes.my} element={<MyPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
