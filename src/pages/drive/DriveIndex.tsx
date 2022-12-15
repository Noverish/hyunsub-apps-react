import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DriveStatusModal from 'src/components/drive/DriveStatusModal';
import ErrorPage from '../common/ErrorPage';
import routes from './DriveRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const DriveListPage = lazy(() => import('src/pages/drive/list/DriveListPage'));

export default function ApparelIndex() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={routes.list} element={<DriveListPage />} />
      </Routes>
      <DriveStatusModal />
    </>
  )
}
