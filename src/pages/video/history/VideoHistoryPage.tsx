import { t } from 'i18next';
import MobileHeader from 'src/components/common/header/MobileHeader';

export default function VideoHistoryPage() {
  return (
    <div className="VideoHistoryPage">
      <MobileHeader title={t('VideoTabBar.history')} />
    </div>
  )
}
