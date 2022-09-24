import { Dispatch } from '@reduxjs/toolkit';
import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import videoRename, { VideoRenameParams } from 'src/api/video/video-rename';
import ApiResult from 'src/components/common/ApiResult';
import { VideoDetailActions } from 'src/pages/video/detail/VideoDetailState';
import { useDispatch, useSelector } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

const videoRenameAction = (params: VideoRenameParams) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));
  const videoRenameResult = await videoRename(params);
  dispatch(VideoDetailActions.update({ videoRenameResult }));
  dispatch(GlobalActions.update({ loading: false }));
}

interface Props {
  title: string;
  videoId: string;
}

export default function VideoRenameCard({ title, videoId }: Props) {
  const dispatch = useDispatch();
  const result = useSelector(s => s.video.detail.videoRenameResult);
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
            <Form.Control {...register('from')} className="input_dark" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>to</Form.Label>
            <Form.Control {...register('to')} className="input_dark" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check {...register('isRegex')} className="input_dark" type="checkbox" label="isRegex" defaultChecked={false} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Rename
          </Button>
        </Form>

        {result && <ApiResult className="mt-3" result={result} />}
      </Card.Body>
    </Card>
  )
}
