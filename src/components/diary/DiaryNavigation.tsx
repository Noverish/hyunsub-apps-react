import { t } from 'i18next';

import CommonNavigation from 'src/components/common/navigation/CommonNavigation';
import { NavigationProps } from 'src/model/component';
import DiaryRoutes from 'src/pages/diary/DiaryRoutes';

const props: NavigationProps = {
  title: 'HyunDiary',
  menus: [
    {
      name: t('DiaryNavigation.list'),
      link: DiaryRoutes.listRoute,
      icon: 'fas fa-list',
    },
    {
      name: t('DiaryNavigation.calendar'),
      link: DiaryRoutes.calendarRoute,
      icon: 'far fa-calendar-alt',
    },
  ],
  disableSearch: true,
};

export default function DiaryNavigation() {
  return <CommonNavigation {...props} />;
}
