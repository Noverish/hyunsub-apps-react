import t from "src/i18n";
import CommonTabBar, { TabBarItem } from "../common/header/CommonTabBar";
import ComicRoutes from 'src/pages/comic/ComicRoutes';

const items: TabBarItem[] = [
  {
    name: t('ComicTabBar.list'),
    link: ComicRoutes.list,
    icon: 'fas fa-book',
  },
  {
    name: t('ComicTabBar.subscription'),
    link: ComicRoutes.list,
    icon: 'fas fa-bookmark',
  },
  {
    name: t('ComicTabBar.like'),
    link: ComicRoutes.list,
    icon: 'fas fa-heart',
  },
  {
    name: t('ComicTabBar.history'),
    link: ComicRoutes.list,
    icon: 'fas fa-history',
  },
]

export default function ComicTabBar() {
  return (
    <CommonTabBar items={items} />
  )
}
