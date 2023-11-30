import { t } from 'i18next';

import CommonNavigation from 'src/components/common/navigation/CommonNavigation';
import { CommonNavigationProps } from 'src/model/component';
import DiaryRoutes from 'src/pages/diary/DiaryRoutes';

const props: CommonNavigationProps = {
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
};

export default function DiaryNavigation() {
  return <CommonNavigation {...props} />;
}
