import VideoHomePageSection from './VideoHomePageSection';
import { VideoHomeRecent } from 'src/api/video/video-home';
import VideoEntryView from 'src/components/video/VideoEntryView2';
import router from 'src/pages/router';
import VideoRoutes from 'src/pages/video/VideoRoutes';

interface Props {
  recent: VideoHomeRecent;
}

export default function VideoHomePageRecentSection({ recent }: Props) {
  const { category, list } = recent;

  const onMoreClick = () => {
    router.navigate(VideoRoutes.list(category.name));
  };

  const items = list.map((entry) => <VideoEntryView key={entry.id} category={category} entry={entry} />);

  return <VideoHomePageSection title={category.displayName} onMoreClick={onMoreClick} items={items} />;
}
