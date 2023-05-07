import { t } from 'i18next';

import CommonTabBar, { TabBarItem } from '../../common/header/CommonTabBar';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';

const items: TabBarItem[] = [
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
    icon: 'fas fa-plus',
  },
];

export default function PhotoTabBar() {
  return <CommonTabBar items={items} />;
}
