import React from 'react';
import { VideoCategory, VideoEntry } from 'src/model/video';
import { useNavigateVideoDetail } from 'src/pages/video/list/VideoListHooks';
import VideoRoutes from 'src/pages/video/VideoRoutes';

import './VideoEntryView.scss';

interface Props {
  category: VideoCategory
  entry: VideoEntry;
}

export default function VideoEntryView({ category, entry }: Props) {
  const href = VideoRoutes.detailRoute(entry.id);
  const style: any = category.itemCss && JSON.parse(category.itemCss);
  const navigateVideoDetail = useNavigateVideoDetail();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateVideoDetail(entry.id);
  };

  return (
    <a key={entry.id} href={href} className="VideoEntryView col move_up_on_hover" onClick={onClick}>
      <div className="ratio" style={style}>
        <img className="thumbnail" src={entry.thumbnail} loading="lazy" alt={entry.name} />
      </div>
      <div className="title">{entry.name}</div>
    </a>
  )
}
