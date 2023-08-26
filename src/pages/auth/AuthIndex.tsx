import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import AdminLayout from 'src/components/common/AdminLayout';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const LoginPage = lazy(() => import('src/pages/auth/login/LoginPage'));
const RegisterPage = lazy(() => import('src/pages/auth/register/RegisterPage'));
const ProfilePage = lazy(() => import('src/pages/auth/profile/ProfilePage'));
const AuthAdminPage = lazy(() => import('src/pages/auth/admin/AuthAdminPage'));

export const AuthRouteObjects: RouteObject[] = [
  { path: '*', element: <NotFoundPage /> },
  { path: '/', element: <Navigate to={AuthRoutes.login} /> },
  { path: AuthRoutes.login, element: <LoginPage /> },
  { path: AuthRoutes.register, element: <RegisterPage /> },
  { path: AuthRoutes.profile, element: <ProfilePage /> },
  {
    path: AuthRoutes.admin,
    element: (
      <AdminLayout>
        <AuthAdminPage />
      </AdminLayout>
    ),
  },
];
