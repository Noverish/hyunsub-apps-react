import { useContext } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { VideoManageContext } from '../VideoManageContext';
import { VideoEncodeParams } from 'src/api/video/video-manage/video-encode';
import ApiResult from 'src/components/common/ApiResult';
import VideoManageHooks from 'src/pages/video/video-manage/VideoManageHooks';

export default function VideoEncodeCard() {
  const { videoId } = VideoManageHooks.usePageParams();
  const encode = VideoManageHooks.useEncode();
  const [{ videoEncodeResult: result }] = useContext(VideoManageContext);

  const { register, handleSubmit } = useForm<VideoEncodeParams>({
    defaultValues: { videoId, options: '-vcodec libx264 -acodec copy -crf 29' },
  });

  return (
    <Card>
      <Card.Header>Encode Video</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(encode)} className="d-grid gap-3">
          <Form.Group>
            <Form.Label>Options</Form.Label>
            <Form.Control {...register('options')} />
          </Form.Group>

          <div>
            <Button variant="primary" type="submit">
              Encode
            </Button>
          </div>

          {result && <ApiResult result={result} />}
        </Form>
      </Card.Body>
    </Card>
  );
}
