import { t } from 'i18next';

import FriendRoutes from '../FriendRoutes';
import FriendSearchResult from '../search/components/FriendSearchResult';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { HeaderButton } from 'src/model/component';
import router from 'src/pages/router';

export default function FriendListPage() {
  const headerBtns: HeaderButton[] = [
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
