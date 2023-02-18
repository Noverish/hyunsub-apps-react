import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ComicTabBar from 'src/components/comic/ComicTabBar';
import CommonRoutes from '../common/CommonRoutes';
import routes from './ComicRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const ComicListPage = lazy(() => import('src/pages/comic/list/ComicListPage'));
const ComicDetailPage = lazy(() => import('src/pages/comic/detail/ComicDetailPage'));
const ComicViewerPage = lazy(() => import('src/pages/comic/viewer/ComicViewerPage'));
const ComicMenuPage = lazy(() => import('src/pages/comic/menu/ComicMenuPage'));

export default function ComicIndex() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={CommonRoutes.menu} element={<ComicMenuPage />} />
        <Route path={routes.list} element={<ComicListPage />} />
        <Route path={routes.detail} element={<ComicDetailPage />} />
        <Route path={routes.viewer} element={<ComicViewerPage />} />
      </Routes>
      <ComicTabBar />
    </>
  )
}
