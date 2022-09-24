import { Dispatch } from '@reduxjs/toolkit';
import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import videoEncode, { VideoEncodeParams } from 'src/api/video/video-encode';
import ApiResult from 'src/components/common/ApiResult';
import { VideoDetailActions } from 'src/pages/video/detail/VideoDetailState';
import { useDispatch, useSelector } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

const videoEncodeAction = (params: VideoEncodeParams) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));
  const videoEncodeResult = await videoEncode(params);
  dispatch(VideoDetailActions.update({ videoEncodeResult }));
  dispatch(GlobalActions.update({ loading: false }));
}

interface Props {
  videoId: string;
}

export default function VideoEncodeCard({ videoId }: Props) {
  const dispatch = useDispatch();
  const result = useSelector(s => s.video.detail.videoEncodeResult);
  const { register, handleSubmit } = useForm<VideoEncodeParams>({
    defaultValues: { options: '-vcodec libx264 -acodec copy -crf 29' },
  });

  const onSubmit: SubmitHandler<VideoEncodeParams> = (params: VideoEncodeParams) => {
    dispatch(videoEncodeAction({ ...params, videoId }));
  };

  return (
    <Card>
      <Card.Header>Encode Video</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>options</Form.Label>
            <Form.Control {...register('options')} className="input_dark" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Encode
          </Button>
        </Form>

        {result && <ApiResult className="mt-3" result={result} />}
      </Card.Body>
    </Card>
  )
}
