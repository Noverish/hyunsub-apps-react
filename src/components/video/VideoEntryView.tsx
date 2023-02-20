import { VideoEntry, VideoCategory } from 'src/model/video';
import React from 'react';
import { loadVideoDetail } from 'src/pages/video/list/VideoListContext';
import VideoRoutes from 'src/pages/video/VideoRoutes';
import { dispatch } from 'src/redux';

interface Props {
  category: VideoCategory
  entry: VideoEntry;
}

export default function VideoEntryView({ category, entry }: Props) {
  const href = VideoRoutes.detailRoute(entry.id);
  const style: any = category.itemCss && JSON.parse(category.itemCss);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(loadVideoDetail(entry.id));
  };

  return (
    <a key={entry.id} href={href} className="VideoEntryView col d-block move_up_on_hover" onClick={onClick}>
      <div className="ratio" style={style}>
        <img className="img-fluid rounded-1" src={entry.thumbnail} loading="lazy" alt={entry.name} />
      </div>
      <div className="title mt-2 text-break">{entry.name}</div>
    </a>
  )
}
