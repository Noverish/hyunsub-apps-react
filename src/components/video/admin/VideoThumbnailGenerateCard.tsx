import { Button, Card } from 'react-bootstrap';

import ApiResult from 'src/components/common/ApiResult';
import { videoThumbnailAction } from 'src/pages/video/admin/VideoAdminContext';
import { useDispatch, useSelector } from 'src/redux';

interface Props {
  videoId: string;
}

export default function VideoThumbnailGenerateCard({ videoId }: Props) {
  const dispatch = useDispatch();
  const result = useSelector((s) => s.video.admin.videoThumbnailResult);

  const onClick = () => {
    dispatch(videoThumbnailAction(videoId));
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
