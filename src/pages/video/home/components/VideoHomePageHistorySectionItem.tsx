import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { timeAgo } from 'src/i18n';

import { VideoCategoryContext } from 'src/context/video/VideoCategoryContext';
import { VideoEntryHistory } from 'src/model/video';
import VideoRoutes from 'src/pages/video/VideoRoutes';

import './VideoHomePageHistorySectionItem.scss';

interface Props {
  history: VideoEntryHistory;
}

export default function VideoHomePageHistorySectionItem({ history }: Props) {
  const { time, duration, entryId, videoId, entryTitle, videoTitle, thumbnail, date } = history;

  const categories = useContext(VideoCategoryContext);
  const category = categories.filter((v) => v.name === history.category)[0];
  const style: any = category ? JSON.parse(category.itemCss) : {};

  const href = VideoRoutes.detail({ entryId, videoId });
  const precent = time ? (time / duration) * 100 : 0;
  const dateStr = timeAgo.format(new Date(date));

  return (
    <Link to={href} className="VideoHomePageHistorySectionItem move_up_on_hover">
      <div className="ratio" style={style}>
        <img className="thumbnail" src={thumbnail} loading="lazy" alt={entryTitle} />
        <div className="time_container">
          <div className="time" style={{ width: `${precent}%` }} />
        </div>
      </div>
      <div className="title">{videoTitle}</div>
      <div className="date">{dateStr}</div>
    </Link>
  );
}
