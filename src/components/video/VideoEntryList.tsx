import cs from 'classnames';

import VideoEntryView from 'src/components/video/VideoEntryView';
import { VideoCategory, VideoEntry } from 'src/model/video';

interface Props {
  category: VideoCategory;
  entries: VideoEntry[];
}

export default function VideoEntryList({ category, entries }: Props) {
  const elements = entries.map((entry) => <VideoEntryView key={entry.id} category={category} entry={entry} />);

  const className = cs('VideoEntryList d-grid gap-1 gap-md-2', category.listHtmlClass);

  return <div className={className}>{elements}</div>;
}
