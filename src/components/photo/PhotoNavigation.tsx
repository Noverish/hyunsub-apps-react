import { t } from 'i18next';

import CommonNavigation from 'src/components/common/navigation/CommonNavigation';
import { NavigationProps } from 'src/model/component';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';

const props: NavigationProps = {
  title: 'HyunPhoto',
  menus: [
    {
      name: t('PhotoNavigation.album'),
      link: PhotoRoutes.albums,
      icon: 'fas fa-book',
    },
    {
      name: t('PhotoNavigation.photo'),
      link: PhotoRoutes.photosRoute,
      icon: 'fas fa-images',
    },
    {
      name: t('PhotoNavigation.upload'),
      link: PhotoRoutes.photoUpload,
      icon: 'fas fa-upload',
    },
  ],
};

export default function PhotoNavigation() {
  return <CommonNavigation {...props} />;
}
