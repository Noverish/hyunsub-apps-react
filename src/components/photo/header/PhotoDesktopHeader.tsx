import { t } from 'i18next';

import DesktopHeader, { DesktopHeaderProps } from '../../common/header/DesktopHeader';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';

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
      link: PhotoRoutes.photoUpload,
      icon: 'fas fa-upload',
    },
  ],
  dropdowns: [],
};

export default function PhotoDesktopHeader() {
  return <DesktopHeader {...desktopProps} />;
}
