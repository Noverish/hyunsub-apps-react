import { t } from 'i18next';
import React, { useContext } from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';

import { VideoSubtitle } from 'src/model/video';
import { VideoDetailContext } from 'src/pages/video/detail/VideoDetailContext';

interface Props {
  subtitles: VideoSubtitle[];
}

export default function VideoSubtitleSettingCard({ subtitles }: Props) {
  const items = subtitles.map((v) => <VideoSubtitleSettingItem key={v.url} subtitle={v} />);

  return (
    <Card>
      <Card.Header>{t('video.subtitle-setting.title')}</Card.Header>
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
  const [state, setState] = useContext(VideoDetailContext);
  const { label } = subtitle;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sync = parseInt(e.currentTarget.value, 10);
    state.subtitleSync[subtitle.url] = sync;
    setState(state);
  };

  return (
    <InputGroup className="d-inline-flex" style={{ width: '250px' }}>
      <InputGroup.Text>{label}</InputGroup.Text>
      <Form.Control type="number" className="text-end" onChange={onChange} />
      <InputGroup.Text>ms</InputGroup.Text>
    </InputGroup>
  );
}
