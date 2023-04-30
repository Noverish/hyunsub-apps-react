import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import routes from './DriveRoutes';
import PhotoDesktopHeader from 'src/components/photo/header/PhotoDesktopHeader';

import './DriveStyle.scss';

const DriveExplorerPage = lazy(() => import('src/pages/drive/explorer/DriveExplorerPage'));
const DriveRenamePage = lazy(() => import('src/pages/drive/rename/DriveRenamePage'));
const DriveMovePage = lazy(() => import('src/pages/drive/move/DriveMovePage'));

export const DriveRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <PhotoDesktopHeader />
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <Navigate to={routes.explorer} /> },
      { path: routes.explorer, element: <DriveExplorerPage /> },
      { path: routes.rename, element: <DriveRenamePage /> },
      { path: routes.move, element: <DriveMovePage /> },
    ]
  }
]
