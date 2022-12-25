import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './common/ErrorPage';
import ForbiddenPage from './common/ForbiddenPage';
import RootIndex from './index';

const router = createBrowserRouter([
  { path: '/forbidden', element: <ForbiddenPage />},
  { path: '/error', element: <ErrorPage />},
  { path: '*', element: <RootIndex /> },
])

export default router;
