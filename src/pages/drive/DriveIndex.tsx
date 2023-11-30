import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import routes from './DriveRoutes';
import DriveExplorerPage from './explorer/DriveExplorerPage';
import DriveMenuPage from './menu/DriveMenuPage';
import DriveNavigation from 'src/components/drive/DriveNavigation';

export const DriveRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <DriveNavigation />
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
