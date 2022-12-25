import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DriveStatusModal from 'src/components/drive/DriveStatusModal';
import routes from './DriveRoutes';
import DriveNewFolderModal from 'src/components/drive/DriveNewFolderModal';
import DriveRenameModal from 'src/components/drive/DriveRenameModal';

import './DriveStyle.scss';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const DriveExplorerPage = lazy(() => import('src/pages/drive/explorer/DriveExplorerPage'));
const DriveRenamePage = lazy(() => import('src/pages/drive/rename/DriveRenamePage'));
const DriveMovePage = lazy(() => import('src/pages/drive/move/DriveMovePage'));

export default function DriveIndex() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to={routes.explorer} />} />
        <Route path={routes.explorer} element={<DriveExplorerPage />} />
        <Route path={routes.rename} element={<DriveRenamePage />} />
        <Route path={routes.move} element={<DriveMovePage />} />
      </Routes>
      <DriveStatusModal />
      <DriveNewFolderModal />
      <DriveRenameModal />
    </>
  )
}
