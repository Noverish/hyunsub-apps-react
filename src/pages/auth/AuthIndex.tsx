import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import routes from './AuthRoutes';
import AdminLayout from 'src/components/common/AdminLayout';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const LoginPage = lazy(() => import('src/pages/auth/login/LoginPage'));
const RegisterPage = lazy(() => import('src/pages/auth/register/RegisterPage'));
const MyPage = lazy(() => import('src/pages/auth/my/MyPage'));
const AuthAdminPage = lazy(() => import('src/pages/auth/admin/AuthAdminPage'));

export const AuthRouteObjects: RouteObject[] = [
  { path: '*', element: <NotFoundPage /> },
  { path: '/', element: <Navigate to={routes.login} /> },
  { path: routes.login, element: <LoginPage /> },
  { path: routes.register, element: <RegisterPage /> },
  { path: routes.my, element: <MyPage /> },
  {
    path: routes.admin,
    element: (
      <AdminLayout>
        <AuthAdminPage />
      </AdminLayout>
    ),
  },
];
