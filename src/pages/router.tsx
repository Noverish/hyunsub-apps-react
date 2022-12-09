import { createBrowserRouter } from 'react-router-dom';
import RootIndex from './index';

const router = createBrowserRouter([
  { path: '*', element: <RootIndex /> },
])

export default router;
