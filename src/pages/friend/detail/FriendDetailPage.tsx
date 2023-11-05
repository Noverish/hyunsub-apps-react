import { t } from 'i18next';

import FriendRoutes from '../FriendRoutes';
import FriendDetailHooks from './FriendDetailHooks';
import FriendDetailView from './components/FriendDetailView';
import friendDetailApi from 'src/api/friend/friend-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { useUrlParams } from 'src/hooks/url-params';
import router from 'src/pages/router';

export default function FriendDetailPage() {
  const [friendId] = useUrlParams('friendId');
  const { data: friend } = friendDetailApi.useApiResult({ friendId });
  const remove = FriendDetailHooks.useDelete();

  const mobileHeaderBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-edit',
      name: t('edit'),
      onClick: () => router.navigate(FriendRoutes.update(friendId)),
    },
    {
      icon: 'fas fa-trash-alt',
      name: t('delete'),
      onClick: () => (friend ? remove(friend) : undefined),
    },
  ];

  return (
    <CommonLayout className="FriendDetailPage" title={t('FriendDetailPage.title')} back btns={mobileHeaderBtns}>
      {friend ? <FriendDetailView friend={friend} /> : <Loading />}
    </CommonLayout>
  );
}
