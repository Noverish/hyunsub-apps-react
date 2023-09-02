import { t } from 'i18next';

import DesktopHeader, { DesktopHeaderProps } from '../../common/header/DesktopHeader';
import ComicRoutes from 'src/pages/comic/ComicRoutes';

const desktopProps: DesktopHeaderProps = {
  title: 'HyunComic',
  menus: [
    {
      name: t('ComicTabBar.list'),
      link: ComicRoutes.list,
      icon: 'fas fa-book',
    },
  ],
  dropdowns: [],
  onSearch: () => {
    alert('Not yet implemented');
  },
};

export default function ComicDesktopHeader() {
  return <DesktopHeader {...desktopProps} />;
}
