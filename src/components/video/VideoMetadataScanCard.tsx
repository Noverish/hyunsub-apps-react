import { Dispatch } from '@reduxjs/toolkit';
import { Button, Card } from 'react-bootstrap';
import scanVideoMetadata from 'src/api/video/video-scan-metadata';
import ApiResult from 'src/components/common/ApiResult';
import { VideoDetailActions } from 'src/pages/video/detail/VideoDetailState';
import { useDispatch, useSelector } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

const scanVideoMetadataAction = (videoId: string) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));
  const scanMetadataResult = await scanVideoMetadata({ videoId });
  dispatch(VideoDetailActions.update({ scanMetadataResult }));
  dispatch(GlobalActions.update({ loading: false }));
}

interface Props {
  videoId: string;
}

export default function VideoMetadataScanCard({ videoId }: Props) {
  const dispatch = useDispatch();
  const result = useSelector(s => s.video.detail.scanMetadataResult);

  const onClick = () => {
    dispatch(scanVideoMetadataAction(videoId));
  }

  return (
    <Card>
      <Card.Header>Scan Video Metadata</Card.Header>
      <Card.Body>
        <Button variant="primary" onClick={onClick}>Scan</Button>
        {result && <ApiResult className="mt-3" result={result} />}
      </Card.Body>
    </Card>
  )
}
