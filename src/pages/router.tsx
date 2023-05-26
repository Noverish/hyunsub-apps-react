import { Suspense } from 'react';
import { Outlet, RouteObject, ScrollRestoration, createBrowserRouter } from 'react-router-dom';

import { ApparelRouteObjects } from './apparel/ApparelIndex';
import { AuthRouteObjects } from './auth/AuthIndex';
import { ComicRouteObjects } from './comic/ComicIndex';
import NotFoundPage from './common/NotFoundPage';
import RouteErrorBoundary from './common/RouteErrorBoundary';
import { DriveRouteObjects } from './drive/DriveIndex';
import { PhotoRouteObjects } from './photo/PhotoIndex';
import { VideoRotueObjects } from './video/VideoIndex';
import { VestigeRouteObjects } from './vestige/VestigeIndex';
import LoadingPage from 'src/pages/common/LoadingPage';

function pickRoutes(): RouteObject[] {
  const host = window.location.hostname;

  if (host.endsWith('auth.hyunsub.kim')) {
    return AuthRouteObjects;
  }

  if (host.endsWith('video.hyunsub.kim')) {
    return VideoRotueObjects;
  }

  if (host.endsWith('photo.hyunsub.kim')) {
    return PhotoRouteObjects;
  }

  if (host.endsWith('apparel.hyunsub.kim')) {
    return ApparelRouteObjects;
  }

  if (host.endsWith('drive.hyunsub.kim')) {
    return DriveRouteObjects;
  }

  if (host.endsWith('comic.hyunsub.kim')) {
    return ComicRouteObjects;
  }

  if (host.endsWith('vestige.hyunsub.kim')) {
    return VestigeRouteObjects;
  }

  return [];
}

const router = createBrowserRouter([
  {
    errorElement: <RouteErrorBoundary />,
    element: (
      <>
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
        <ScrollRestoration />
      </>
    ),
    children: [{ path: '*', element: <NotFoundPage /> }, ...pickRoutes()],
  },
]);

export default router;
