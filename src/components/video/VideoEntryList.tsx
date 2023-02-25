import cs from 'classnames';
import VideoEntryView from 'src/components/video/VideoEntryView';
import { VideoCategory, VideoEntry } from "src/model/video";

interface Props {
  category: VideoCategory,
  entries: VideoEntry[];
}

export default function VideoEntryList({ category, entries }: Props) {
  const elements = entries.map(entry => (
    <VideoEntryView key={entry.id} category={category} entry={entry} />
  ));

  return (
    <div id="VideoEntryList" className={cs('row g-2 g-md-3', category.listHtmlClass)}>
      {elements}
    </div>
  )
}
