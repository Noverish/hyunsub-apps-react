import { Suspense, lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import CommonRoutes from '../common/CommonRoutes';
import CommonMenuPage from '../common/menu/CommonMenuPage';
import routes from './ApparelRoutes';
import ApparelNavigation from 'src/components/apparel/ApparelNavigation';
import LoadingPage from 'src/pages/common/LoadingPage';

const ApparelListPage = lazy(() => import('src/pages/apparel/list/ApparelListPage'));
const ApparelDetailPage = lazy(() => import('src/pages/apparel/detail/ApparelDetailPage'));
const ApparelEditPage = lazy(() => import('src/pages/apparel/edit/ApparelEditPage'));
const ApparelAddPage = lazy(() => import('src/pages/apparel/add/ApparelAddPage'));
const ApparelCategoryListPage = lazy(() => import('src/pages/apparel/category-list/ApparelCategoryListPage'));
const ApparelCategoryDetailPage = lazy(() => import('src/pages/apparel/category-detail/ApparelCategoryDetailPage'));
const ApparelBrandListPage = lazy(() => import('src/pages/apparel/brand-list/ApparelBrandListPage'));
const ApparelBrandDetailPage = lazy(() => import('src/pages/apparel/brand-detail/ApparelBrandDetailPage'));

export const ApparelRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <ApparelNavigation />
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </>
    ),
    children: [
      { path: routes.list, element: <ApparelListPage /> },
      { path: routes.add, element: <ApparelAddPage /> },
      { path: routes.detailRoute, element: <ApparelDetailPage /> },
      { path: routes.editRoute, element: <ApparelEditPage /> },
      { path: routes.categoryList, element: <ApparelCategoryListPage /> },
      { path: routes.categoryDetailRoute, element: <ApparelCategoryDetailPage /> },
      { path: routes.brandList, element: <ApparelBrandListPage /> },
      { path: routes.brandDetailRoute, element: <ApparelBrandDetailPage /> },
      { path: CommonRoutes.menu, element: <CommonMenuPage /> },
    ],
  },
];
