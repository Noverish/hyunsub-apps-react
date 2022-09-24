import { Dispatch } from '@reduxjs/toolkit';
import { Button, Card } from 'react-bootstrap';
import videoThumbnail from 'src/api/video/video-thumbnail';
import ApiResult from 'src/components/common/ApiResult';
import { VideoDetailActions } from 'src/pages/video/detail/VideoDetailState';
import { useDispatch, useSelector } from 'src/redux';
import { GlobalActions } from 'src/redux/global';

const videoThumbnailAction = (videoId: string) => async (dispatch: Dispatch) => {
  dispatch(GlobalActions.update({ loading: true }));
  const time = window.player?.currentTime;
  const videoThumbnailResult = await videoThumbnail({ videoId, time });
  dispatch(VideoDetailActions.update({ videoThumbnailResult }));
  dispatch(GlobalActions.update({ loading: false }));
}

interface Props {
  videoId: string;
}

export default function VideoThumbnailGenerateCard({ videoId }: Props) {
  const dispatch = useDispatch();
  const result = useSelector(s => s.video.detail.videoThumbnailResult);

  const onClick = () => {
    dispatch(videoThumbnailAction(videoId));
  }

  return (
    <Card>
      <Card.Header>Generate Video Thumbnail</Card.Header>
      <Card.Body>
        <Button variant="primary" onClick={onClick}>Scan</Button>
        {result && <ApiResult className="mt-3" result={result} />}
      </Card.Body>
    </Card>
  )
}
