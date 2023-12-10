import { Button, Card, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import VideoManageHooks from '../VideoManageHooks';
import VideoSubtitleDropdown from './VideoSubtitleDropdown';
import { VideoSubtitleSyncParams } from 'src/api/video/video-manage/video-subtitle-sync';
import ApiResult from 'src/components/common/ApiResult';
import { VideoSubtitle } from 'src/model/video';
import { useSelector } from 'src/redux';

interface Props {
  subtitles: VideoSubtitle[];
}

export default function VideoSubtitleSyncCard({ subtitles }: Props) {
  const { videoId } = VideoManageHooks.usePageParams();
  const syncSubtitle = VideoManageHooks.syncSubtitle();

  const result = useSelector((s) => s.video.admin.videoSubtitleSyncResult);
  const { register, handleSubmit, control } = useForm<VideoSubtitleSyncParams>({
    defaultValues: { videoId, subtitleId: subtitles[0].id },
  });

  const onSubmit: SubmitHandler<VideoSubtitleSyncParams> = (params) => {
    syncSubtitle(params);
  };

  return (
    <div className="VideoSubtitleSyncCard">
      <Card>
        <Card.Header>Sync Subtitle</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Subtitle Language</Form.Label>
              <VideoSubtitleDropdown control={control} subtitles={subtitles} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ms</Form.Label>
              <Form.Control type="number" {...register('ms')} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sync
            </Button>
          </Form>

          {result && <ApiResult className="mt-3" result={result} />}
        </Card.Body>
      </Card>
    </div>
  );
}
