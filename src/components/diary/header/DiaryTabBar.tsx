import { t } from 'i18next';

import CommonTabBar, { TabBarItem } from '../../common/header/CommonTabBar';
import DiaryRoutes from 'src/pages/diary/DiaryRoutes';

const items: TabBarItem[] = [
  {
    name: t('DiaryTabBar.list'),
    link: DiaryRoutes.listRoute,
    icon: 'fas fa-list',
  },
  {
    name: t('DiaryTabBar.calendar'),
    link: DiaryRoutes.calendarRoute,
    icon: 'far fa-calendar-alt',
  },
];

export default function DiaryTabBar() {
  return <CommonTabBar items={items} />;
}
