import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import DriveDesktopHeader from 'src/components/drive/header/DriveDesktopHeader';
import routes from './DriveRoutes';

const DriveExplorerPage = lazy(() => import('src/pages/drive/explorer/DriveExplorerPage'));

export const DriveRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <DriveDesktopHeader />
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <Navigate to={routes.explorerRoute} /> },
      { path: routes.explorerRoute, element: <DriveExplorerPage /> },
    ]
  }
]
