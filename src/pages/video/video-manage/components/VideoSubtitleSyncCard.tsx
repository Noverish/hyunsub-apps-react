import { useContext } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import VideoManageHooks from '../VideoManageHooks';
import VideoSubtitleDropdown from './VideoSubtitleDropdown';
import { VideoSubtitleSyncParams } from 'src/api/video/video-manage/video-subtitle-sync';
import ApiResult from 'src/components/common/ApiResult';
import { VideoSubtitle } from 'src/model/video';
import { VideoManageContext } from 'src/pages/video/video-manage/VideoManageContext';

interface Props {
  subtitles: VideoSubtitle[];
}

export default function VideoSubtitleSyncCard({ subtitles }: Props) {
  const { videoId } = VideoManageHooks.usePageParams();
  const sync = VideoManageHooks.useSyncSubtitle();
  const [{ videoSubtitleSyncResult: result }] = useContext(VideoManageContext);

  const { register, handleSubmit, control } = useForm<VideoSubtitleSyncParams>({
    defaultValues: { videoId, subtitleId: subtitles[0].id },
  });

  return (
    <div className="VideoSubtitleSyncCard">
      <Card>
        <Card.Header>Sync Subtitle</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(sync)} className="d-grid gap-3">
            <Form.Group>
              <Form.Label>Subtitle Language</Form.Label>
              <VideoSubtitleDropdown control={control} subtitles={subtitles} />
            </Form.Group>

            <Form.Group>
              <Form.Label>ms</Form.Label>
              <Form.Control type="number" {...register('ms')} />
            </Form.Group>

            <div>
              <Button type="submit">Sync</Button>
            </div>

            {result && <ApiResult result={result} />}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
