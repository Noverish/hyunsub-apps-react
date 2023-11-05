import { t } from 'i18next';

import DesktopHeader, { DesktopHeaderProps } from '../../common/header/DesktopHeader';
import FriendRoutes from 'src/pages/friend/FriendRoutes';

const desktopProps: DesktopHeaderProps = {
  title: 'HyunFriend',
  menus: [
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
  ],
  dropdowns: [],
};

export default function FriendDesktopHeader() {
  return <DesktopHeader {...desktopProps} />;
}
