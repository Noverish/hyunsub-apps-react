import { t } from 'i18next';

import CommonNavigation from 'src/components/common/navigation/CommonNavigation';
import { CommonNavigationProps } from 'src/model/component';
import ComicRoutes from 'src/pages/comic/ComicRoutes';

const props: CommonNavigationProps = {
  title: 'HyunComic',
  menus: [
    {
      name: t('ComicNavigation.list'),
      link: ComicRoutes.list,
      icon: 'fas fa-book',
    },
    {
      name: t('ComicNavigation.history'),
      link: ComicRoutes.history,
      icon: 'fas fa-history',
    },
  ],
};

export default function ComicNavigation() {
  return <CommonNavigation {...props} />;
}
