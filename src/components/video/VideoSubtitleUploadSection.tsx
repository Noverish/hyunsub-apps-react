import { Dispatch } from '@reduxjs/toolkit';
import { useRef, useState } from 'react';
import { Button, ButtonGroup, Card, Form, ToggleButton } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FileInfo } from 'src/api/file/readdir-detail';
import videoSubtitleUpload, { VideoSubtitleUploadParams } from 'src/api/video/video-subtitle-upload';
import ApiResult from 'src/components/common/ApiResult';
import PathSearchSelect from 'src/components/common/PathSearchSelect';
import { VideoDetailActions } from 'src/pages/video/detail/VideoDetailState';
import { RootState, useDispatch, useSelector } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

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
  const [isUploadMode, setUploadMode] = useState(true);
  const videoPathRef = useRef<string>();

  const { register, handleSubmit } = useForm<FormState>();

  const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadMode(e.currentTarget.value === 'true');
  }

  const onVideoPathSelect = (info?: FileInfo) => {
    videoPathRef.current = info?.path;
  }

  const onSubmit: SubmitHandler<FormState> = (params: FormState) => {
    dispatch(videoSubtitleUploadAction({
      videoId,
      lang: params.lang,
      file: (isUploadMode) ? params.file[0] : undefined,
      path: (isUploadMode) ? undefined : videoPathRef.current,
    }));
  };

  return (
    <Card>
      <Card.Header>Upload Video Subtitle</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ButtonGroup className="mb-3">
            <ToggleButton
              id="radio-true"
              type="radio"
              variant="outline-primary"
              name="radio"
              value="true"
              checked={isUploadMode}
              onChange={onToggle}
            >
              Upload Mode
            </ToggleButton>
            <ToggleButton
              id="radio-false"
              type="radio"
              variant="outline-primary"
              name="radio"
              value="false"
              checked={!isUploadMode}
              onChange={onToggle}
            >
              File Move Mode
            </ToggleButton>
          </ButtonGroup>

          {isUploadMode && <Form.Group className="mb-3">
            <Form.Label>Subtitle File</Form.Label>
            <Form.Control type="file" {...register('file')} className="input_dark" />
          </Form.Group>}

          {!isUploadMode && <Form.Group className="mb-3">
            <Form.Label>Video Original Path</Form.Label>
            <PathSearchSelect onSelect={onVideoPathSelect} />
          </Form.Group>}

          <Form.Group className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Control {...register('lang')} className="input_dark" />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isUploadMode ? 'Upload' : 'Move File'}
          </Button>

          {result && <ApiResult className="mt-3" result={result} />}
        </Form>
      </Card.Body>
    </Card>
  )
}
