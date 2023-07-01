import { useState } from 'react';
import { Button, ButtonGroup, Card, Form, ToggleButton } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { VideoSubtitleParams } from 'src/api/video/video-manage/video-subtitle';
import ApiResult from 'src/components/common/ApiResult';
import PathSelect from 'src/components/common/select/PathSelect';
import { useUrlParams } from 'src/hooks/url-params';
import { videoSubtitleUploadAction } from 'src/pages/video/admin/VideoAdminContext';
import { useDispatch, useSelector } from 'src/redux';

export default function VideoSubtitleUploadCard() {
  const [videoId] = useUrlParams('videoId');
  const dispatch = useDispatch();
  const result = useSelector((s) => s.video.admin.videoSubtitleUploadResult);
  const [isUploadMode, setUploadMode] = useState(true);

  const { register, handleSubmit, setValue } = useForm<VideoSubtitleParams>();

  const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadMode(e.currentTarget.value === 'true');
  };

  const onVideoPathSelect = (path: string) => {
    setValue('path', path);
  };

  const onSubmit: SubmitHandler<VideoSubtitleParams> = (params: VideoSubtitleParams) => {
    dispatch(
      videoSubtitleUploadAction({
        videoId,
        lang: params.lang,
        file: isUploadMode ? params.file : undefined,
        path: isUploadMode ? undefined : params.path,
        override: params.override,
      })
    );
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

          {isUploadMode && (
            <Form.Group className="mb-3">
              <Form.Label>Subtitle File</Form.Label>
              <Form.Control type="file" {...register('file')} />
            </Form.Group>
          )}

          {!isUploadMode && (
            <Form.Group className="mb-3">
              <Form.Label>Video Original Path</Form.Label>
              <PathSelect onSelect={onVideoPathSelect} />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Control {...register('lang')} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="override_checkbox">
            <Form.Check {...register('override')} label="Override?" />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isUploadMode ? 'Upload' : 'Move File'}
          </Button>

          {result && <ApiResult className="mt-3" result={result} />}
        </Form>
      </Card.Body>
    </Card>
  );
}
