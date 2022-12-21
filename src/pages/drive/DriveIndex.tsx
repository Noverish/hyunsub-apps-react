import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DriveStatusModal from 'src/components/drive/DriveStatusModal';
import ErrorPage from '../common/ErrorPage';
import routes from './DriveRoutes';

import './DriveStyle.scss';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const DriveExplorerPage = lazy(() => import('src/pages/drive/explorer/DriveExplorerPage'));
const DriveRenamePage = lazy(() => import('src/pages/drive/rename/DriveRenamePage'));

export default function ApparelIndex() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to={routes.explorer} />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={routes.explorer} element={<DriveExplorerPage />} />
        <Route path={routes.rename} element={<DriveRenamePage />} />
      </Routes>
      <DriveStatusModal />
    </>
  )
}
