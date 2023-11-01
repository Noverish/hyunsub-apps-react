import { t } from 'i18next';

import CommonTabBar, { TabBarItem } from '../../common/header/CommonTabBar';
import FriendRoutes from 'src/pages/friend/FriendRoutes';

const items: TabBarItem[] = [
  {
    name: t('FriendTabBar.list'),
    link: FriendRoutes.listRoute,
    icon: 'fas fa-list',
  },
  {
    name: t('FriendTabBar.tags'),
    link: FriendRoutes.tagListRoute,
    icon: 'fas fa-tag',
  },
];

export default function FriendTabBar() {
  return <CommonTabBar items={items} />;
}
