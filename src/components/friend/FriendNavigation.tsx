import { t } from 'i18next';

import CommonNavigation from 'src/components/common/navigation/CommonNavigation';
import { CommonNavigationProps } from 'src/model/component';
import FriendRoutes from 'src/pages/friend/FriendRoutes';

const props: CommonNavigationProps = {
  title: 'HyunFriend',
  menus: [
    {
      name: t('FriendNavigation.list'),
      link: FriendRoutes.listRoute,
      icon: 'fas fa-list',
    },
    {
      name: t('FriendNavigation.tags'),
      link: FriendRoutes.tagListRoute,
      icon: 'fas fa-tag',
    },
  ],
};

export default function FriendNavigation() {
  return <CommonNavigation {...props} />;
}
