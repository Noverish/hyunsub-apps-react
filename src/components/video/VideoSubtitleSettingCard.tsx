import React from 'react';
import { Card, ListGroup, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { VideoSubtitle } from 'src/model/video';
import { VideoDetailActions } from 'src/pages/video/detail/VideoDetailState';
import { useDispatch } from 'src/redux';

interface Props {
  subtitles: VideoSubtitle[];
}

export default function VideoSubtitleSettingCard({ subtitles }: Props) {
  const items = subtitles.map(v => (
    <VideoSubtitleSettingItem key={v.url} subtitle={v} />
  ));

  return (
    <Card>
      <Card.Header>Subtitle Sync Setting</Card.Header>
      <Card.Body>
        <div className="d-flex gap-3 flex-wrap">
          {items}
        </div>
      </Card.Body>
    </Card>
  )
}

interface VideoSubtitleSettingItemProps {
  subtitle: VideoSubtitle;
}

function VideoSubtitleSettingItem({ subtitle }: VideoSubtitleSettingItemProps) {
  const dispatch = useDispatch();
  const { label } = subtitle;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sync = parseInt(e.currentTarget.value, 10);
    dispatch(VideoDetailActions.setSubtitleSyncSetting({ [subtitle.url]: sync }));
  };

  return (
    <InputGroup className="d-inline-flex" style={{ width: '250px' }}>
      <InputGroup.Text>{label}</InputGroup.Text>
      <Form.Control type="number" className="text-end" onChange={onChange} />
      <InputGroup.Text>ms</InputGroup.Text>
    </InputGroup>
  )
}
