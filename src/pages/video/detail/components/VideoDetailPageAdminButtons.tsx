import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useVideoDetailPageParams } from '../VideoDetailHooks';
import { useIsAdmin } from 'src/hooks/token';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { useVideoDetailPageData } from 'src/pages/video/detail/VideoDetailHooks';

export default function VideoDetailPageAdminButtons() {
  const { entryId } = useVideoDetailPageParams();
  const { video } = useVideoDetailPageData();
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return <></>;
  }

  return (
    <>
      <hr />
      <div className="admin_btns">
        <Link to={VideoRoutes.videoManage(entryId, video.videoId)}>
          <Button>Video Manage</Button>
        </Link>
        <Link to={VideoRoutes.entryManage(entryId)}>
          <Button>Entry Manage</Button>
        </Link>
      </div>
    </>
  );
}
