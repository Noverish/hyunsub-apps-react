import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import routes from './DiaryRoutes';

const DiaryListPage = lazy(() => import('./list/DiaryListPage'));
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
      { path: '/', element: <Navigate to={routes.listRoute} /> },
      { path: routes.listRoute, element: <DiaryListPage /> },
      { path: routes.detailRoute, element: <DiaryDetailPage /> },
    ],
  },
];
