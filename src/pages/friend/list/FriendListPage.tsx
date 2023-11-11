import { t } from 'i18next';

import FriendRoutes from '../FriendRoutes';
import FriendSearchResult from '../search/components/FriendSearchResult';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import router from 'src/pages/router';

export default function FriendListPage() {
  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      name: t('add'),
      onClick: () => router.navigate(FriendRoutes.createRoute),
    },
  ];

  return (
    <CommonLayout className="FriendListPage" title={t('FriendListPage.title')} btns={headerBtns}>
      <FriendSearchResult ignoreQuery />
    </CommonLayout>
  );
}
