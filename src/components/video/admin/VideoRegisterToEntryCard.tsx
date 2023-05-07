import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { VideoRegisterParams } from 'src/api/video/admin/video-register';
import ApiResult from 'src/components/common/ApiResult';
import PathSelect from 'src/components/common/PathSelect';
import { videoRegisterToEntryAction } from 'src/pages/video/admin/VideoAdminContext';
import { useDispatch, useSelector } from 'src/redux';

interface Props {
  entryId: string;
}

export default function VideoRegisterToEntryCard({ entryId }: Props) {
  const dispatch = useDispatch();
  const result = useSelector((s) => s.video.admin.videoRegisterToEntryResult);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoRegisterParams>({ defaultValues: { videoEntryId: entryId } });

  const onVideoPathSelect = (path: string) => {
    setValue('videoPath', path, { shouldValidate: true });
  };

  const onOutputPathSelect = (path: string) => {
    setValue('outputPath', path, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<VideoRegisterParams> = (params: VideoRegisterParams) => {
    dispatch(videoRegisterToEntryAction(params));
  };

  register('videoPath', { required: 'There is no video path' });
  register('outputPath', { required: 'There is no output path' });

  return (
    <Card>
      <Card.Header>Register Video</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Video Original Path</Form.Label>
            <PathSelect onSelect={onVideoPathSelect} isInvalid={!!errors.videoPath?.message} />
            <Form.Control.Feedback type="invalid">{errors.videoPath?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Video Destination Path</Form.Label>
            <PathSelect onSelect={onOutputPathSelect} isInvalid={!!errors.outputPath?.message} />
            <Form.Control.Feedback type="invalid">{errors.outputPath?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Season</Form.Label>
            <Form.Control {...register('videoSeason')} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>

          {result && <ApiResult className="mt-3" result={result} />}
        </Form>
      </Card.Body>
    </Card>
  );
}
