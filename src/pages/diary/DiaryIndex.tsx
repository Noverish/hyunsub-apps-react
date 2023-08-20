import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import routes from './DiaryRoutes';

const DiaryHomePage = lazy(() => import('./home/DiaryHomePage'));
const DiaryDetailPage = lazy(() => import('./detail/DiaryDetailPage'));

export const DiaryRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.home} /> },
      { path: routes.home, element: <DiaryHomePage /> },
      { path: routes.detailRoute, element: <DiaryDetailPage /> },
    ],
  },
];
