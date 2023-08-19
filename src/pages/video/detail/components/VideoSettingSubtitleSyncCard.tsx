import { t } from 'i18next';
import { debounce } from 'lodash';
import React, { useContext } from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';

import { VideoSubtitle } from 'src/model/video';
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailContext';

interface Props {
  subtitles: VideoSubtitle[];
}

export default function VideoSettingSubtitleSyncCard({ subtitles }: Props) {
  const items = subtitles.map((v) => <VideoSubtitleSettingItem key={v.url} subtitle={v} />);

  return (
    <Card className="VideoSettingSubtitleSyncCard">
      <Card.Header>{t('video.VideoSettingSubtitleSyncCard.title')}</Card.Header>
      <Card.Body>
        <div className="d-flex gap-3 flex-wrap">{items}</div>
      </Card.Body>
    </Card>
  );
}

interface VideoSubtitleSettingItemProps {
  subtitle: VideoSubtitle;
}

function VideoSubtitleSettingItem({ subtitle }: VideoSubtitleSettingItemProps) {
  const [{ subtitleSync }, setState] = useContext(VideoDetailContext);
  const { label } = subtitle;

  const updateSubtitleSync = debounce((sync: number) => {
    subtitleSync[subtitle.url] = sync;
    setState({ subtitleSync });
  }, 500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSubtitleSync(parseInt(e.currentTarget.value, 10));
  };

  const value = subtitleSync[subtitle.url] ?? 0;

  return (
    <InputGroup className="d-inline-flex" style={{ width: '250px' }}>
      <InputGroup.Text>{label}</InputGroup.Text>
      <Form.Control type="number" className="text-end" onChange={onChange} defaultValue={value} />
      <InputGroup.Text>ms</InputGroup.Text>
    </InputGroup>
  );
}
