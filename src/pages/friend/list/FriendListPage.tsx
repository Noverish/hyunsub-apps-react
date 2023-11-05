import { t } from 'i18next';

import FriendRoutes from '../FriendRoutes';
import friendSearchApi from 'src/api/friend/friend-search';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import FriendPreviewList from 'src/components/friend/FriendPreviewList';
import CommonPageHooks from 'src/hooks/common/CommonPageHooks';
import router from 'src/pages/router';

export default function FriendListPage() {
  const { page, setPage } = CommonPageHooks.usePage();

  const { data } = friendSearchApi.useApiResult({ page, query: '' });

  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      onClick: () => router.navigate(FriendRoutes.createRoute),
    },
  ];

  return (
    <CommonLayout className="FriendListPage" title={t('FriendListPage.title')} btns={headerBtns}>
      <FriendPreviewList data={data} page={page} setPage={setPage} />
    </CommonLayout>
  );
}
