import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../common/ErrorPage';
import routes from './EncodeRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const EncodeHomePage = lazy(() => import('src/pages/encode/home/EncodeHomePage'));

export default function EncodeIndex() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={routes.home} element={<EncodeHomePage />} />
      </Routes>
    </>
  )
}
