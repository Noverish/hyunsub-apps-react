import { t } from 'i18next';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import DesktopHeader, { DesktopHeaderProps } from '../../common/header/DesktopHeader';

const desktopProps: DesktopHeaderProps = {
  title: 'HyunPhoto',
  menus: [
    {
      name: t('PhotoTabBar.album'),
      link: PhotoRoutes.albums,
      icon: 'fas fa-book',
    },
    {
      name: t('PhotoTabBar.photo'),
      link: PhotoRoutes.photos,
      icon: 'fas fa-images',
    },
    {
      name: t('PhotoTabBar.upload'),
      link: PhotoRoutes.upload,
      icon: 'fas fa-upload',
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
