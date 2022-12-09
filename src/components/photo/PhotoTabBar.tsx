import CommonTabBar, { TabBarItem } from "../common/header/CommonTabBar";
import PhotoRoutes from 'src/pages/photo/PhotoRoutes';

const items: TabBarItem[] = [
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
  {
    name: 'Upload',
    link: PhotoRoutes.upload,
    icon: 'fas fa-plus',
  },
  {
    name: 'Share',
    link: PhotoRoutes.share,
    icon: 'fas fa-share-alt',
  },
  {
    name: 'Menu',
    link: PhotoRoutes.menu,
    icon: 'fas fa-bars',
  },
]

export default function PhotoTabBar() {
  return (
    <CommonTabBar items={items} />
  )
}
