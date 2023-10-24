import { t } from 'i18next';

import FriendDetailHooks from './FriendDetailHooks';
import FriendDetailView from './components/FriendDetailView';
import friendDetailApi from 'src/api/friend/friend-detail';
import { CommonSuspenseFallback } from 'src/components/common/CommonSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';

export default function FriendDetailPage() {
  const { friendId } = FriendDetailHooks.usePageData();

  const { data: friend } = friendDetailApi.useApiResult({ friendId });

  return (
    <div className="FriendDetailPage">
      <MobileHeader title={t('FriendDetailPage.title')} back />
      <CommonContainer>{friend ? <FriendDetailView friend={friend} /> : <CommonSuspenseFallback />}</CommonContainer>
    </div>
  );
}
