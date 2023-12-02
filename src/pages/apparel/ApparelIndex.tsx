import { Outlet, RouteObject } from 'react-router-dom';

import CommonRoutes from '../common/CommonRoutes';
import CommonMenuPage from '../common/menu/CommonMenuPage';
import routes from './ApparelRoutes';
import ApparelViewerPage from './viewer/ApparelViewerPage';
import ApparelNavigation from 'src/components/apparel/ApparelNavigation';
import ApparelBrandDetailPage from 'src/pages/apparel/brand-detail/ApparelBrandDetailPage';
import ApparelBrandListPage from 'src/pages/apparel/brand-list/ApparelBrandListPage';
import ApparelCategoryDetailPage from 'src/pages/apparel/category-detail/ApparelCategoryDetailPage';
import ApparelCategoryListPage from 'src/pages/apparel/category-list/ApparelCategoryListPage';
import ApparelCreatePage from 'src/pages/apparel/create/ApparelCreatePage';
import ApparelDetailPage from 'src/pages/apparel/detail/ApparelDetailPage';
import ApparelListPage from 'src/pages/apparel/list/ApparelListPage';
import ApparelUpdatePage from 'src/pages/apparel/update/ApparelUpdatePage';

export const ApparelRouteObjects: RouteObject[] = [
  {
    path: routes.viewerRoute,
    element: <ApparelViewerPage />,
  },
  {
    path: '/',
    element: (
      <>
        <ApparelNavigation />
        <Outlet />
      </>
    ),
    children: [
      { path: routes.list, element: <ApparelListPage /> },
      { path: routes.create, element: <ApparelCreatePage /> },
      { path: routes.detailRoute, element: <ApparelDetailPage /> },
      { path: routes.updateRoute, element: <ApparelUpdatePage /> },
      { path: routes.categoryList, element: <ApparelCategoryListPage /> },
      { path: routes.categoryDetailRoute, element: <ApparelCategoryDetailPage /> },
      { path: routes.brandList, element: <ApparelBrandListPage /> },
      { path: routes.brandDetailRoute, element: <ApparelBrandDetailPage /> },
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
    ],
  },
];
