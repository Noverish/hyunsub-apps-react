import { Outlet, RouteObject } from 'react-router-dom';

import CommonRoutes from '../common/CommonRoutes';
import CommonMenuPage from '../common/menu/CommonMenuPage';
import routes from './DutchRoutes';
import DutchHomePage from './home/DutchHomePage';
import DutchRecordCreatePage from './record-create/DutchRecordCreatePage';
import DutchRecordDetailPage from './record-detail/DutchRecordDetailPage';
import DutchRecordListPage from './record-list/DutchRecordListPage';
import DutchRecordUpdatePage from './record-update/DutchRecordUpdatePage';
import DutchSearchPage from './search/DutchSearchPage';
import DutchSettlePage from './settle/DutchSettlePage';
import DutchNavigation from 'src/components/dutch/DutchNavigation';
import { DutchProvider } from 'src/context/dutch/DutchContext';

export const DutchRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <DutchProvider>
        <DutchNavigation />
        <Outlet />
      </DutchProvider>
    ),
    children: [
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
      { path: CommonRoutes.search, element: <DutchSearchPage /> },
      { path: routes.homeRoute, element: <DutchHomePage /> },
      { path: routes.recordListRoute, element: <DutchRecordListPage /> },
      { path: routes.recordDetailRoute, element: <DutchRecordDetailPage /> },
      { path: routes.recordCreateRoute, element: <DutchRecordCreatePage /> },
      { path: routes.recordUpdateRoute, element: <DutchRecordUpdatePage /> },
      { path: routes.settleRoute, element: <DutchSettlePage /> },
    ],
  },
];
