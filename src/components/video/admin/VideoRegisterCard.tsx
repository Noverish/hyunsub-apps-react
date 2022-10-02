import { useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FileInfo } from 'src/api/file/readdir-detail';
import { VideoRegisterParams } from 'src/api/video/video-register';
import ApiResult from 'src/components/common/ApiResult';
import PathSearchSelect from 'src/components/common/PathSearchSelect';
import { videoRegisterAction } from 'src/pages/video/admin/VideoAdminContext';
import { useDispatch, useSelector } from 'src/redux';

export default function VideoRegisterCard() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<VideoRegisterParams>()
  const videoPathRef = useRef<string>();

  const result = useSelector(s => s.video.admin.videoRegisterResult);

  const onSubmit: SubmitHandler<VideoRegisterParams> = (params: VideoRegisterParams) => {
    const videoPath = videoPathRef.current;
    if (!videoPath) {
      alert('No Video Path');
      return;
    }

    const newParams: VideoRegisterParams = {
      category: params.category,
      outputPath: params.outputPath,
      videoPath,
      videoGroupId: params.videoGroupId ? params.videoGroupId : undefined,
    }

    dispatch(videoRegisterAction(newParams));
  };

  const onVideoPathSelect = (info?: FileInfo) => {
    videoPathRef.current = info?.path;
  }

  return (
    <Card>
      <Card.Header>Register Video</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control {...register('category')} className="input_dark" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Video Original Path</Form.Label>
            <PathSearchSelect onSelect={onVideoPathSelect} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Video Destination Path</Form.Label>
            <Form.Control {...register('outputPath')} className="input_dark" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Video Group Id</Form.Label>
            <Form.Control {...register('videoGroupId')} className="input_dark" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>

          {result && <ApiResult className="mt-3" result={result} />}
        </Form>
      </Card.Body>
    </Card>
  )
}
