import { Outlet, RouteObject } from 'react-router-dom';

import CommonRoutes from '../common/CommonRoutes';
import CommonMenuPage from '../common/menu/CommonMenuPage';
import routes from './DutchRoutes';
import DutchBalanceUpdatePage from './balance-update/DutchBalanceUpdatePage';
import DutchHomePage from './home/DutchHomePage';
import DutchMemberSelectPage from './member-select/DutchMemberSelectPage';
import DutchRecordCreatePage from './record-create/DutchRecordCreatePage';
import DutchRecordDetailPage from './record-detail/DutchRecordDetailPage';
import DutchRecordListPage from './record-list/DutchRecordListPage';
import DutchRecordUpdatePage from './record-update/DutchRecordUpdatePage';
import DutchSearchPage from './search/DutchSearchPage';
import DutchSettlePage from './settle/DutchSettlePage';
import DutchSpendPage from './spend/DutchSpendPage';
import DutchNavigation from 'src/components/dutch/DutchNavigation';
import { DutchProvider } from 'src/context/dutch/DutchContext';

export const DutchRouteObjects: RouteObject[] = [
  { path: routes.memberSelectRoute, element: <DutchMemberSelectPage /> },
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
      { path: routes.spendRoute, element: <DutchSpendPage /> },
      { path: routes.balanceUpdateRoute, element: <DutchBalanceUpdatePage /> },
    ],
  },
];
