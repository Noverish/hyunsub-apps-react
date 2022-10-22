import { lazy } from 'react';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from 'src/pages/common/history';
import ErrorPage from '../common/ErrorPage';
import routes from './EncodeRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const EncodeHomePage = lazy(() => import('src/pages/encode/home/EncodeHomePage'));

export default function EncodeIndex() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={routes.home} element={<EncodeHomePage />} />
      </Routes>
    </HistoryRouter>
  )
}
