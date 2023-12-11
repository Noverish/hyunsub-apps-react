import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';

import VideoManageHooks from '../VideoManageHooks';
import ApiResult from 'src/components/common/ApiResult';
import { VideoManageContext } from 'src/pages/video/video-manage/VideoManageContext';

export default function VideoMetadataCard() {
  const { videoId } = VideoManageHooks.usePageParams();
  const scan = VideoManageHooks.useScanMetadata();
  const [{ videoMetadataResult: result }] = useContext(VideoManageContext);

  const onClick = () => {
    scan(videoId);
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
