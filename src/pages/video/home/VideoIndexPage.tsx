import { Navigate } from 'react-router-dom';
import getCategories from "src/api/video/category";
import NotFoundPage from "src/pages/common/NotFoundPage";
import routes from 'src/pages/video/VideoRoutes';

export default function VideoIndexPage() {
  const categories = getCategories.useApi();

  if (categories.length === 0) {
    return <NotFoundPage />;
  }

  return <Navigate to={routes.listRoute(categories[0].name)} />;
}
