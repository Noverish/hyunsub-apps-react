import { t } from 'i18next';

import { TabBarItem } from 'src/components/common/header/CommonTabBar';
import CommonTabBar from 'src/components/common/header/CommonTabBar';
import VideoRoutes from 'src/pages/video/VideoRoutes';

const items: TabBarItem[] = [
  {
    name: t('VideoTabBar.home'),
    link: VideoRoutes.home,
    icon: 'fas fa-home',
  },
  {
    name: t('VideoTabBar.search'),
    link: VideoRoutes.search,
    icon: 'fas fa-search',
  },
  {
    name: t('VideoTabBar.history'),
    link: VideoRoutes.history,
    icon: 'fas fa-history',
  },
];

export default function VideoTabBar() {
  return <CommonTabBar items={items} />;
}
