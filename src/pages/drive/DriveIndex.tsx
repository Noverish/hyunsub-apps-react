import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import routes from './DriveRoutes';
import DriveExplorerPage from './explorer/DriveExplorerPage';
import DriveMenuPage from './menu/DriveMenuPage';
import DriveDesktopHeader from 'src/components/drive/header/DriveDesktopHeader';
import DriveTabBar from 'src/components/drive/header/DriveTabBar';

export const DriveRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <DriveDesktopHeader />
        <DriveTabBar />
        <Outlet />
      </>
    ),
    children: [
      { path: '/', element: <Navigate to={routes.explorerRoute} /> },
      { path: routes.explorerRoute, element: <DriveExplorerPage /> },
      { path: routes.menuRoute, element: <DriveMenuPage /> },
    ],
  },
];
