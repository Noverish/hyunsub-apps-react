import { createBrowserRouter, RouteObject } from 'react-router-dom';
import ErrorBoundary from './common/ErrorBoundaryV2';
import NotFoundPage from './common/NotFoundPage';
import { VideoRotues } from './video/VideoIndex';

function pickRoutes(): RouteObject[] {
  const host = window.location.hostname;

  if (host.endsWith('video.hyunsub.kim')) {
    return VideoRotues;
  }

  return [];
}

const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    children: [
      { path: '*', element: <NotFoundPage /> },
      ...pickRoutes(),
    ]
  }
]);

export default router;
