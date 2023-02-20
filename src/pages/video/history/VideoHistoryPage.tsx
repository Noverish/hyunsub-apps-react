import { t } from 'i18next';
import VideoHeader from 'src/components/video/VideoHeader';

export default function VideoHistoryPage() {
  return (
    <div className="VideoHistoryPage">
      <VideoHeader title={t('VideoTabBar.history')} />
    </div>
  )
}
