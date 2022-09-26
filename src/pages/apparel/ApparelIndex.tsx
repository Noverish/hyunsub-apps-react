import { lazy } from 'react';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import routes from './ApparelRoutes';
import history from 'src/pages/common/history';
import ErrorPage from '../common/ErrorPage';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const ApparelListPage = lazy(() => import('src/pages/apparel/list/ApparelListPage'));
const ApparelDetailPage = lazy(() => import('src/pages/apparel/detail/ApparelDetailPage'));
const ApparelEditPage = lazy(() => import('src/pages/apparel/edit/ApparelEditPage'));

export default function ApparelIndex() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={routes.list} element={<ApparelListPage />} />
        <Route path={routes.detail} element={<ApparelDetailPage />} />
        <Route path={routes.edit} element={<ApparelEditPage />} />
      </Routes>
    </HistoryRouter>
  )
}