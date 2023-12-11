import { useContext, useState } from 'react';
import { Button, ButtonGroup, Card, Form, ToggleButton } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { VideoSubtitleParams } from 'src/api/video/video-manage/video-subtitle';
import ApiResult from 'src/components/common/ApiResult';
import PathSelect from 'src/components/common/select/PathSelect';
import { VideoManageContext } from 'src/pages/video/video-manage/VideoManageContext';
import VideoManageHooks from 'src/pages/video/video-manage/VideoManageHooks';

export default function VideoSubtitleUploadCard() {
  const { videoId } = VideoManageHooks.usePageParams();
  const upload = VideoManageHooks.useUploadSubtitle();
  const [{ videoSubtitleUploadResult: result }] = useContext(VideoManageContext);

  const [isUploadMode, setUploadMode] = useState(true);

  const { register, handleSubmit, setValue } = useForm<VideoSubtitleParams>();

  const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadMode(e.currentTarget.value === 'true');
  };

  const onVideoPathSelect = (path: string) => {
    setValue('path', path);
  };

  const onSubmit: SubmitHandler<VideoSubtitleParams> = (params: VideoSubtitleParams) => {
    upload({
      videoId,
      lang: params.lang,
      file: isUploadMode ? params.file : undefined,
      path: isUploadMode ? undefined : params.path,
      override: params.override,
    });
  };

  return (
    <Card>
      <Card.Header>Upload Video Subtitle</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-3">
          <Form.Group>
            <ButtonGroup>
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
          </Form.Group>

          {isUploadMode && (
            <Form.Group>
              <Form.Label>Subtitle File</Form.Label>
              <Form.Control type="file" {...register('file')} />
            </Form.Group>
          )}

          {!isUploadMode && (
            <Form.Group>
              <Form.Label>Video Original Path</Form.Label>
              <PathSelect onSelect={onVideoPathSelect} />
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label>Language</Form.Label>
            <Form.Control {...register('lang')} />
          </Form.Group>

          <Form.Group controlId="override_checkbox">
            <Form.Check {...register('override')} label="Override?" />
          </Form.Group>

          <div>
            <Button type="submit">{isUploadMode ? 'Upload' : 'Move File'}</Button>
          </div>

          {result && <ApiResult result={result} />}
        </Form>
      </Card.Body>
    </Card>
  );
}
