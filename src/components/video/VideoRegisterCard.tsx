import { Dispatch } from '@reduxjs/toolkit';
import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import videoRegister, { VideoRegisterParams } from 'src/api/video/video-register';
import { VideoUploadActions } from 'src/pages/video/upload/VideoUploadState';
import { RootState, useDispatch } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

const requestVideoRegister = (params: VideoRegisterParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));

  const result = await videoRegister(params);
  dispatch(VideoUploadActions.update({ result }));

  dispatch(GlobalActions.update({ loading: false }));
}

export default function VideoRegisterCard() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<VideoRegisterParams>()

  const onSubmit: SubmitHandler<VideoRegisterParams> = (params: VideoRegisterParams) => {
    dispatch(requestVideoRegister(params));
  };

  return (
    <Card>
      <Card.Header>Register Exist Video</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type</Form.Label>
            <Form.Control {...register('type')}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Video Path</Form.Label>
            <Form.Control {...register('videoPath')} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Video Entry ID</Form.Label>
            <Form.Control {...register('videoEntryId')} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
