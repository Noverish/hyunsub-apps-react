import { Link } from 'react-router-dom';

import VideoRoutes from '../../VideoRoutes';
import VideoThumbnail from 'src/components/video/VideoThumbnail';
import { VideoHistory } from 'src/model/video';
import { timeAgo } from 'src/i18n';

import './VideoHistoryItem.scss';

interface Props {
  history: VideoHistory;
}

export default function VideoHistoryItem({ history }: Props) {
  const { videoId, entryId, thumbnail, time, duration, date } = history;

  const href = VideoRoutes.detail({ entryId, videoId });
  const dateStr = timeAgo.format(new Date(date));

  return (
    <Link className="VideoHistoryItem move_up_on_hover" to={href}>
      <VideoThumbnail className="thumbnail_container ratio-16x9" src={thumbnail} time={time} duration={duration} />
      <div className="info_container">
        <span className="title">{history.title}</span>
        <span className="date">{dateStr}</span>
      </div>
    </Link>
  );
}
