import { Outlet, RouteObject } from 'react-router-dom';

import CommonRoutes from '../common/CommonRoutes';
import CommonMenuPage from '../common/menu/CommonMenuPage';
import routes from './DutchRoutes';
import DutchHomePage from './home/DutchHomePage';
import DutchRecordListPage from './record/DutchRecordListPage';
import DutchSearchPage from './search/DutchSearchPage';
import DutchNavigation from 'src/components/dutch/DutchNavigation';

export const DutchRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <DutchNavigation />
        <Outlet />
      </>
    ),
    children: [
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
      { path: CommonRoutes.search, element: <DutchSearchPage /> },
      { path: routes.homeRoute, element: <DutchHomePage /> },
      { path: routes.recordListRoute, element: <DutchRecordListPage /> },
    ],
  },
];
