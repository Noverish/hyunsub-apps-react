import { createBrowserRouter, RouteObject } from 'react-router-dom';
import RouteErrorBoundary from './common/RouteErrorBoundary';
import NotFoundPage from './common/NotFoundPage';
import { VideoRotueObjects } from './video/VideoIndex';

function pickRoutes(): RouteObject[] {
  const host = window.location.hostname;

  if (host.endsWith('video.hyunsub.kim')) {
    return VideoRotueObjects;
  }

  return [];
}

const router = createBrowserRouter([
  {
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: '*', element: <NotFoundPage /> },
      ...pickRoutes(),
    ]
  }
]);

export default router;
