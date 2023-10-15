import { Link } from 'react-router-dom';

import { VideoCategory, VideoEntry } from 'src/model/video';
import VideoRoutes from 'src/pages/video/VideoRoutes';

import './VideoEntryView.scss';

interface Props {
  category: VideoCategory;
  entry: VideoEntry;
}

export default function VideoEntryView({ category, entry }: Props) {
  const href = VideoRoutes.detail({ entryId: entry.id });
  const style: any = category.itemCss && JSON.parse(category.itemCss);

  return (
    <Link to={href} className="VideoEntryView move_up_on_hover">
      <div className="ratio" style={style}>
        <img className="thumbnail" src={entry.thumbnail} loading="lazy" alt={entry.name} />
      </div>
      <div className="title">{entry.name}</div>
    </Link>
  );
}
