import { t } from 'i18next';

import VideoRoutes from '../../VideoRoutes';
import VideoHomePageHistorySectionItem from './VideoHomePageHistorySectionItem';
import { VideoEntryHistory } from 'src/model/video';
import router from 'src/pages/router';
import VideoHomePageSection from 'src/pages/video/home/components/VideoHomePageSection';

interface Props {
  histories: VideoEntryHistory[];
}

export default function VideoHomePageHistorySection({ histories }: Props) {
  const onMoreClick = () => {
    router.navigate(VideoRoutes.history);
  };

  const items = histories.map((history) => <VideoHomePageHistorySectionItem history={history} key={history.entryId} />);

  return <VideoHomePageSection title={t('VideoTabBar.history')} onMoreClick={onMoreClick} items={items} />;
}
