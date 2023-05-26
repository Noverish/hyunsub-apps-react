import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import routes from './VestigeRoutes';

const VestigeHomePage = lazy(() => import('./home/VestigeHomePage'));

export const VestigeRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.home} /> },
      { path: routes.home, element: <VestigeHomePage /> },
    ],
  },
];
