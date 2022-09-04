import { Dispatch } from '@reduxjs/toolkit';
import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import videoSubtitleUpload, { VideoSubtitleUploadParams } from 'src/api/video/video-subtitle-upload';
import { VideoDetailActions } from 'src/pages/video/detail/VideoDetailState';
import { RootState, useDispatch, useSelector } from 'src/redux';
import { GlobalActions } from 'src/redux/global';
import ApiResult from '../common/ApiResult';

const videoSubtitleUploadAction = (params: VideoSubtitleUploadParams) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(GlobalActions.update({ loading: true }));

  const result = await videoSubtitleUpload(params);
  dispatch(VideoDetailActions.update({ videoSubtitleUploadresult: result }));

  dispatch(GlobalActions.update({ loading: false }));
};

interface Props {
  videoId: string;
}

interface FormState {
  lang: string;
  file: FileList;
}

export default function VideoSubtitleUploadSection({ videoId }: Props) {
  const dispatch = useDispatch();
  const result = useSelector(s => s.video.detail.videoSubtitleUploadresult);

  const { register, handleSubmit } = useForm<FormState>();
  
  const onSubmit: SubmitHandler<FormState> = (params: FormState) => {
    dispatch(videoSubtitleUploadAction({
      videoId,
      lang: params.lang,
      file: params.file[0],
    }));
  };

  return (
    <Card>
      <Card.Header>Upload Video Subtitle</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Subtitle File</Form.Label>
            <Form.Control type="file" {...register('file')} className="input_dark" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Control {...register('lang')} className="input_dark" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Upload
          </Button>

          {result && <ApiResult className="mt-3" result={result} />}
        </Form>
      </Card.Body>
    </Card>
  )
}
