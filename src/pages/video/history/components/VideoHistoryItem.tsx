import { useContext } from 'react';
import { Link } from 'react-router-dom';

import VideoRoutes from '../../VideoRoutes';
import SelectIndicator from 'src/components/common/SelectIndicator';
import VideoThumbnail from 'src/components/video/VideoThumbnail';
import { ChooseContext } from 'src/context/choose/ChooseContext';
import { timeAgo } from 'src/i18n';
import { VideoHistory } from 'src/model/video';

import './VideoHistoryItem.scss';

interface Props {
  history: VideoHistory;
}

export default function VideoHistoryItem({ history }: Props) {
  const { videoId, entryId, thumbnail, time, duration, date } = history;

  const { isChooseMode, choices, onChoose } = useContext(ChooseContext);
  const isChosen = choices.includes(videoId);

  const href = VideoRoutes.detail({ entryId, videoId });
  const dateStr = timeAgo.format(new Date(date));

  const onSelect = () => onChoose(videoId);

  return (
    <Link className="VideoHistoryItem move_up_on_hover" to={href}>
      <VideoThumbnail className="thumbnail_container ratio-16x9" src={thumbnail} time={time} duration={duration} />
      <div className="info_container">
        <span className="title">{history.title}</span>
        <span className="date">{dateStr}</span>
      </div>
      <SelectIndicator enable={isChooseMode} selected={isChosen} onSelect={onSelect} />
    </Link>
  );
}
