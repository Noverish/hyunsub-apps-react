import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import getCategories from "src/api/video/category";
import NotFoundPage from "src/pages/NotFoundPage";
import routes from 'src/pages/video/VideoRoutes';

export default function VideoIndexPage() {
  const categories = useQuery('categories', () => getCategories()).data!!;

  if (categories.length === 0) {
    return <NotFoundPage />;
  }

  return <Navigate to={routes.getListRoute(categories[0].name)} />;
}
