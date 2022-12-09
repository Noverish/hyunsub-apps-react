import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../common/ErrorPage';
import routes from './ApparelRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const ApparelListPage = lazy(() => import('src/pages/apparel/list/ApparelListPage'));
const ApparelDetailPage = lazy(() => import('src/pages/apparel/detail/ApparelDetailPage'));
const ApparelEditPage = lazy(() => import('src/pages/apparel/edit/ApparelEditPage'));
const ApparelAddPage = lazy(() => import('src/pages/apparel/add/ApparelAddPage'));
const ApparelCategoryListPage = lazy(() => import('src/pages/apparel/category-list/ApparelCategoryListPage'));
const ApparelCategoryDetailPage = lazy(() => import('src/pages/apparel/category-detail/ApparelCategoryDetailPage'));
const ApparelBrandListPage = lazy(() => import('src/pages/apparel/brand-list/ApparelBrandListPage'));
const ApparelBrandDetailPage = lazy(() => import('src/pages/apparel/brand-detail/ApparelBrandDetailPage'));

export default function ApparelIndex() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={routes.list} element={<ApparelListPage />} />
        <Route path={routes.add} element={<ApparelAddPage />} />
        <Route path={routes.detail} element={<ApparelDetailPage />} />
        <Route path={routes.edit} element={<ApparelEditPage />} />
        <Route path={routes.categoryList} element={<ApparelCategoryListPage />} />
        <Route path={routes.categoryDetail} element={<ApparelCategoryDetailPage />} />
        <Route path={routes.brandList} element={<ApparelBrandListPage />} />
        <Route path={routes.brandDetail} element={<ApparelBrandDetailPage />} />
      </Routes>
    </>
  )
}
