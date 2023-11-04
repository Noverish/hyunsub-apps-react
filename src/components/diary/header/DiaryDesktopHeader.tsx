import { t } from 'i18next';

import DesktopHeader, { DesktopHeaderProps } from '../../common/header/DesktopHeader';
import DiaryRoutes from 'src/pages/diary/DiaryRoutes';

const desktopProps: DesktopHeaderProps = {
  title: 'HyunDiary',
  menus: [
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
  ],
  dropdowns: [],
};

export default function DiaryDesktopHeader() {
  return <DesktopHeader {...desktopProps} />;
}
