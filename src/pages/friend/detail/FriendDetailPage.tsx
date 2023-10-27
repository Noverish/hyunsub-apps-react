import { t } from 'i18next';

import FriendRoutes from '../FriendRoutes';
import FriendDetailHooks from './FriendDetailHooks';
import FriendDetailView from './components/FriendDetailView';
import friendDetailApi from 'src/api/friend/friend-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import router from 'src/pages/router';
import { setDocumentTitle } from 'src/utils/services';

export default function FriendDetailPage() {
  setDocumentTitle(t('FriendDetailPage.title'));

  const { friendId } = FriendDetailHooks.usePageData();
  const { data: friend } = friendDetailApi.useApiResult({ friendId });
  const deleteFriend = FriendDetailHooks.useDelete();

  const mobileHeaderBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-edit',
      onClick: () => router.navigate(FriendRoutes.update(friendId)),
    },
    {
      icon: 'fas fa-trash-alt',
      onClick: () => (friend ? deleteFriend(friend) : undefined),
    },
  ];

  return (
    <div className="FriendDetailPage">
      <MobileHeader title={t('FriendDetailPage.title')} back btns={mobileHeaderBtns} />
      <CommonContainer>{friend ? <FriendDetailView friend={friend} /> : <Loading />}</CommonContainer>
    </div>
  );
}
