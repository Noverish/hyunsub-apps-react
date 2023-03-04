import { t } from 'i18next';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import DesktopHeader, { DesktopHeaderProps } from '../../common/header/DesktopHeader';

const desktopProps: DesktopHeaderProps = {
  title: 'HyunPhoto',
  menus: [
    {
      name: 'Albums',
      link: PhotoRoutes.albums,
      icon: 'fas fa-book',
    },
    {
      name: 'Photos',
      link: PhotoRoutes.photos,
      icon: 'fas fa-images',
    },
  ],
  dropdowns: [
    {
      name: t('setting'),
      link: PhotoRoutes.menu,
    }
  ],
  onSearch: () => {
    alert('Not yet implemented');
  },
}

export default function PhotoDesktopHeader() {
  return <DesktopHeader {...desktopProps} />
}
