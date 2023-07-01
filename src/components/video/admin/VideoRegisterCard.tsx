import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { VideoRegisterParams } from 'src/api/video/admin/video-register';
import ApiResult from 'src/components/common/ApiResult';
import PathSelect from 'src/components/common/select/PathSelect';
import VieoCategorySelect from 'src/components/video/select/VideoCategorySelect';
import VideoGroupSelect from 'src/components/video/select/VideoGroupSelect';
import { VideoCategory, VideoGroup } from 'src/model/video';
import { videoRegisterAction } from 'src/pages/video/admin/VideoAdminContext';
import { useDispatch, useSelector } from 'src/redux';

export default function VideoRegisterCard() {
  const dispatch = useDispatch();
  const result = useSelector((s) => s.video.admin.videoRegisterResult);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoRegisterParams>();

  const onVideoPathSelect = (path: string) => {
    setValue('videoPath', path, { shouldValidate: true });
  };

  const onOutputPathSelect = (path: string) => {
    setValue('outputPath', path, { shouldValidate: true });
  };

  const onCategorySelect = (category: VideoCategory | null) => {
    setValue('category', category?.name ?? '', { shouldValidate: true });
  };

  const onGroupSelect = (group: VideoGroup | null) => {
    setValue('videoGroupId', group?.id ?? '', { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<VideoRegisterParams> = (params: VideoRegisterParams) => {
    dispatch(videoRegisterAction(params));
  };

  register('category', { required: 'There is no category' });
  register('videoPath', { required: 'There is no video path' });
  register('outputPath', { required: 'There is no output path' });

  return (
    <Card>
      <Card.Header>Register Video</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <VieoCategorySelect onSelect={onCategorySelect} isInvalid={!!errors.category?.message} />
            <Form.Control.Feedback type="invalid">{errors.category?.message}</Form.Control.Feedback>
          </Form.Group>

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
            <Form.Label>Group Id</Form.Label>
            <VideoGroupSelect onSelect={onGroupSelect} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Group Name</Form.Label>
            <Form.Control {...register('newGroupName')} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Thumbnail URL</Form.Label>
            <Form.Control {...register('thumbnailUrl')} />
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
