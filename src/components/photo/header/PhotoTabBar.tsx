import { t } from 'i18next';
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';
import CommonTabBar, { TabBarItem } from "../../common/header/CommonTabBar";

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
    link: PhotoRoutes.upload,
    icon: 'fas fa-plus',
  },
]

export default function PhotoTabBar() {
  return (
    <CommonTabBar items={items} />
  )
}