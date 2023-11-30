import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import VideoRoutes from '../VideoRoutes';
import { useIsAdmin } from 'src/hooks/token';
import CommonMenuPage from 'src/pages/common/menu/CommonMenuPage';

export default function VideoMenuPage() {
  const isAdmin = useIsAdmin();

  const adminBtn = (
    <Link to={VideoRoutes.admin} className="mt-3 d-grid">
      <Button>Admin</Button>
    </Link>
  );

  return <CommonMenuPage>{isAdmin && adminBtn}</CommonMenuPage>;
}
