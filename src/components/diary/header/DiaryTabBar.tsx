import { t } from 'i18next';

import CommonTabBar, { TabBarItem } from '../../common/header/CommonTabBar';
import DiaryRoutes from 'src/pages/diary/DiaryRoutes';

const items: TabBarItem[] = [
  {
    name: t('DiaryTabBar.list'),
    link: DiaryRoutes.listRoute,
    icon: 'fas fa-home',
  },
  {
    name: t('DiaryTabBar.write'),
    link: DiaryRoutes.createRoute,
    icon: 'fas fa-plus',
  },
];

export default function DiaryTabBar() {
  return <CommonTabBar items={items} />;
}
