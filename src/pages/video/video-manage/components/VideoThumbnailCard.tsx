import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';

import VideoManageHooks from '../VideoManageHooks';
import ApiResult from 'src/components/common/ApiResult';
import { VideoManageContext } from 'src/pages/video/video-manage/VideoManageContext';

export default function VideoThumbnailCard() {
  const { videoId } = VideoManageHooks.usePageParams();
  const generate = VideoManageHooks.useGenerateThumbnail();
  const [{ videoThumbnailResult: result }] = useContext(VideoManageContext);

  const onClick = () => {
    generate(videoId);
  };

  return (
    <Card>
      <Card.Header>Generate Video Thumbnail</Card.Header>
      <Card.Body>
        <Button variant="primary" onClick={onClick}>
          Scan
        </Button>
        {result && <ApiResult className="mt-3" result={result} />}
      </Card.Body>
    </Card>
  );
}
