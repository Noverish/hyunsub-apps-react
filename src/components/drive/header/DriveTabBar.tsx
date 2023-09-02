import { t } from 'i18next';

import CommonTabBar, { TabBarItem } from '../../common/header/CommonTabBar';
import DriveRoutes from 'src/pages/drive/DriveRoutes';

const items: TabBarItem[] = [
  {
    name: t('DriveTabBar.explorer'),
    link: DriveRoutes.explorerRoute,
    icon: 'fas fa-folder',
  },
];

export default function DriveTabBar() {
  return <CommonTabBar items={items} />;
}
