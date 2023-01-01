import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './ComicRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const ComicListPage = lazy(() => import('src/pages/comic/list/ComicListPage'));
const ComicDetailPage = lazy(() => import('src/pages/comic/detail/ComicDetailPage'));
const ComicViewerPage = lazy(() => import('src/pages/comic/viewer/ComicViewerPage'));

export default function ComicIndex() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={routes.list} element={<ComicListPage />} />
        <Route path={routes.detail} element={<ComicDetailPage />} />
        <Route path={routes.viewer} element={<ComicViewerPage />} />
      </Routes>
    </>
  )
}
