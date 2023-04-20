import { createBrowserRouter, RouteObject, Outlet, ScrollRestoration } from 'react-router-dom';
import RouteErrorBoundary from './common/RouteErrorBoundary';
import NotFoundPage from './common/NotFoundPage';
import { AuthRouteObjects } from './auth/AuthIndex';
import { VideoRotueObjects } from './video/VideoIndex';
import { PhotoRouteObjects } from './photo/PhotoIndex';
import { Suspense } from 'react';
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
    children: [
      { path: '*', element: <NotFoundPage /> },
      ...pickRoutes(),
    ]
  }
]);

export default router;
