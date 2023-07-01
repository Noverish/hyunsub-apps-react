import { Button, Card } from 'react-bootstrap';

import ApiResult from 'src/components/common/ApiResult';
import { useUrlParams } from 'src/hooks/url-params';
import { videoMetadataScanAction } from 'src/pages/video/admin/VideoAdminContext';
import { useDispatch, useSelector } from 'src/redux';

export default function VideoMetadataScanCard() {
  const [videoId] = useUrlParams('videoId');

  const dispatch = useDispatch();
  const result = useSelector((s) => s.video.admin.videoMetadataScanResult);

  const onClick = () => {
    dispatch(videoMetadataScanAction(videoId));
  };

  return (
    <Card>
      <Card.Header>Scan Video Metadata</Card.Header>
      <Card.Body>
        <Button variant="primary" onClick={onClick}>
          Scan
        </Button>
        {result && <ApiResult className="mt-3" result={result} />}
      </Card.Body>
    </Card>
  );
}
