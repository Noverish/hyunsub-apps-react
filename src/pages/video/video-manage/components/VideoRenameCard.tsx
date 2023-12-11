import { useContext } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import VideoManageHooks from '../VideoManageHooks';
import { VideoRenameParams } from 'src/api/video/video-manage/video-rename';
import ApiResult from 'src/components/common/ApiResult';
import { VideoManageContext } from 'src/pages/video/video-manage/VideoManageContext';

export default function VideoRenameCard() {
  const { videoId } = VideoManageHooks.usePageParams();
  const rename = VideoManageHooks.useRename();
  const [{ videoRenameResult: result }] = useContext(VideoManageContext);

  const { register, handleSubmit } = useForm<VideoRenameParams>({
    defaultValues: { videoId },
  });

  return (
    <Card>
      <Card.Header>Rename Video</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(rename)} className="d-grid gap-3">
          <Form.Group>
            <Form.Label>From</Form.Label>
            <Form.Control {...register('from')} />
          </Form.Group>

          <Form.Group>
            <Form.Label>To</Form.Label>
            <Form.Control {...register('to')} />
          </Form.Group>

          <div>
            <Button type="submit">Rename</Button>
          </div>

          {result && <ApiResult result={result} />}
        </Form>
      </Card.Body>
    </Card>
  );
}
