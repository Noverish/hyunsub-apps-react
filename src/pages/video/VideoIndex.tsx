import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import VideoSearchModal from 'src/components/video/VideoSearchModal';
import VideoTabBar from 'src/components/video/VideoTabBar';
import { useSelector } from 'src/redux';
import routes from './VideoRoutes';

const NotFoundPage = lazy(() => import('src/pages/common/NotFoundPage'));
const VideoIndexPage = lazy(() => import('src/pages/video/home/VideoIndexPage'));
const VideoListPage = lazy(() => import('src/pages/video/list/VideoListPage'));
const VideoDetailPage = lazy(() => import('src/pages/video/detail/VideoDetailPage'));
const VideoAdminPage = lazy(() => import('src/pages/video/admin/VideoAdminPage'));
const VideoMyPage = lazy(() => import('src/pages/video/my/VideoMyPage'));
const VideoMenuPage = lazy(() => import('src/pages/video/menu/VideoMenuPage'));
const VideoSearchPage = lazy(() => import('src/pages/video/search/VideoSearchPage'));
const VideoSearchResultPage = lazy(() => import('src/pages/video/search/VideoSearchResultPage'));

export default function VideoIndex() {
  const isAdmin = useSelector(s => s.global.tokenPayload?.isAdmin || false);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<VideoIndexPage />} />
        <Route path={routes.admin} element={isAdmin ? <VideoAdminPage /> : <NotFoundPage />} />
        <Route path={routes.list} element={<VideoListPage />} />
        <Route path={routes.detail} element={<VideoDetailPage />} />
        <Route path={routes.my} element={<VideoMyPage />} />
        <Route path={routes.menu} element={<VideoMenuPage />} />
        <Route path={routes.search} element={<VideoSearchPage />} />
        <Route path={routes.searchResult} element={<VideoSearchResultPage />} />
      </Routes>
      <VideoSearchModal />
      <VideoTabBar />
    </>
  )
}
