import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { VideoRenameParams } from 'src/api/video/admin/video-rename';
import ApiResult from 'src/components/common/ApiResult';
import { videoRenameAction } from 'src/pages/video/admin/VideoAdminContext';
import { useDispatch, useSelector } from 'src/redux';

interface Props {
  title: string;
  videoId: string;
}

export default function VideoRenameCard({ title, videoId }: Props) {
  const dispatch = useDispatch();
  const result = useSelector((s) => s.video.admin.videoRenameResult);
  const { register, handleSubmit } = useForm<VideoRenameParams>({
    defaultValues: { from: title, to: title },
  });

  const onSubmit: SubmitHandler<VideoRenameParams> = (params: VideoRenameParams) => {
    dispatch(videoRenameAction({ ...params, videoId }));
  };

  return (
    <Card>
      <Card.Header>Rename Video</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>from</Form.Label>
            <Form.Control {...register('from')} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>to</Form.Label>
            <Form.Control {...register('to')} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check {...register('isRegex')} type="checkbox" label="isRegex" defaultChecked={false} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Rename
          </Button>
        </Form>

        {result && <ApiResult className="mt-3" result={result} />}
      </Card.Body>
    </Card>
  );
}
