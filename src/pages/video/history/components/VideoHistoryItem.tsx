import VideoRoutes from '../../VideoRoutes';
import VideoThumbnail from 'src/components/video/VideoThumbnail';
import { VideoHistory } from 'src/model/video';
import router from 'src/pages/router';

import './VideoHistoryItem.scss';

interface Props {
  history: VideoHistory;
}

export default function VideoHistoryItem({ history }: Props) {
  const { videoId, entryId, thumbnailUrl, time, duration } = history;

  const onClick = () => {
    router.navigate(VideoRoutes.detail({ entryId, videoId }));
  };

  return (
    <div className="VideoHistoryItem hyunsub_border gray_bg_hover" onClick={onClick}>
      <VideoThumbnail
        className="thumbnail_container ratio-16x9"
        src={thumbnailUrl}
        time={time}
        duration={duration}
      />
      <div className="info_container">
        <span className="title">{history.title}</span>
        <span className="date">{history.date}</span>
      </div>
    </div>
  );
}
