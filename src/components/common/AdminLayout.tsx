import { useIsAdmin } from 'src/hooks/token';
import NotFoundPage from 'src/pages/common/NotFoundPage';

interface Props {
  children: JSX.Element;
}

export default function AdminLayout({ children }: Props) {
  if (!useIsAdmin()) {
    return <NotFoundPage />;
  }

  return children;
}
