import { Dispatch } from '@reduxjs/toolkit';
import { useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FileInfo } from 'src/api/file/readdir-detail';
import videoRegister, { VideoRegisterParams } from 'src/api/video/video-register';
import { VideoUploadActions } from 'src/pages/video/upload/VideoUploadState';
import { RootState, useDispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import PathSearchSelect from '../common/PathSearchSelect';

const requestVideoRegister = (params: VideoRegisterParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));

  const result = await videoRegister(params);
  dispatch(VideoUploadActions.update({ result }));

  dispatch(GlobalActions.update({ loading: false }));
}

export default function VideoRegisterCard() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<VideoRegisterParams>()
  const videoPathRef = useRef<string>();

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

    dispatch(requestVideoRegister(newParams));
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
        </Form>
      </Card.Body>
    </Card>
  )
}
