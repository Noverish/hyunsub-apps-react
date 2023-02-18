import { lazy } from 'react';

const AppsIndex = lazy(() => import('src/pages/apps/AppsIndex'));
const AuthIndex = lazy(() => import('src/pages/auth/AuthIndex'));
const VideoIndex = lazy(() => import('src/pages/video/VideoIndex'));
const PhotoIndex = lazy(() => import('src/pages/photo/PhotoIndex'));
const ApparelIndex = lazy(() => import('src/pages/apparel/ApparelIndex'));
const EncodeIndex = lazy(() => import('src/pages/encode/EncodeIndex'));
const DriveIndex = lazy(() => import('src/pages/drive/DriveIndex'));
const ComicIndex = lazy(() => import('src/pages/comic/ComicIndex'));

export default function RootIndex(): JSX.Element {
  const host = window.location.hostname;

  if (host.endsWith('apps.hyunsub.kim')) {
    return <AppsIndex />;
  }

  if (host.endsWith('auth.hyunsub.kim')) {
    return <AuthIndex />;
  }

  if (host.endsWith('video.hyunsub.kim')) {
    return <VideoIndex />;
  }

  if (host.endsWith('photo.hyunsub.kim')) {
    return <PhotoIndex />;
  }

  if (host.endsWith('apparel.hyunsub.kim')) {
    return <ApparelIndex />;
  }

  if (host.endsWith('encode.hyunsub.kim')) {
    return <EncodeIndex />;
  }

  if (host.endsWith('drive.hyunsub.kim')) {
    return <DriveIndex />;
  }

  if (host.endsWith('comic.hyunsub.kim')) {
    return <ComicIndex />;
  }

  return (
    <h1>Unknown host: {window.location.host}</h1>
  );
}
