import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import CommonRoutes from '../common/CommonRoutes';
import CommonMenuPage from '../common/menu/CommonMenuPage';
import routes from './DriveRoutes';
import DriveExplorerPage from './explorer/DriveExplorerPage';
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
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
    ],
  },
];
