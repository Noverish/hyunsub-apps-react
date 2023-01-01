import CommonTabBar, { TabBarItem } from "../common/header/CommonTabBar";
import ComicRoutes from 'src/pages/comic/ComicRoutes';

const items: TabBarItem[] = [
  {
    name: 'List',
    link: ComicRoutes.list,
    icon: 'fas fa-book',
  },
  {
    name: 'Subscription',
    link: ComicRoutes.list,
    icon: 'fas fa-bookmark',
  },
  {
    name: 'Likes',
    link: ComicRoutes.list,
    icon: 'fas fa-heart',
  },
  {
    name: 'History',
    link: ComicRoutes.list,
    icon: 'fas fa-history',
  },
  {
    name: 'Menu',
    link: ComicRoutes.list,
    icon: 'fas fa-bars',
  },
]

export default function ComicTabBar() {
  return (
    <CommonTabBar items={items} />
  )
}
