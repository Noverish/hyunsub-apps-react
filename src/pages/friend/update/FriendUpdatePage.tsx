import { t } from 'i18next';

import FriendUpdateHooks from './FriendUpdateHooks';
import friendDetailApi from 'src/api/friend/friend-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import FriendForm from 'src/components/friend/FriendForm';
import { Friend } from 'src/model/friend';
import { setDocumentTitle } from 'src/utils/services';

export default function FriendUpdatePage() {
  setDocumentTitle(t('FriendUpdatePage.title'));

  const { friendId } = FriendUpdateHooks.usePageData();
  const { data: friend } = friendDetailApi.useApiResult({ friendId });
  const updateFriend = FriendUpdateHooks.useUpdate();

  const onComplete = (friend: Friend) => {
    updateFriend(friend);
  };

  return (
    <div className="FriendUpdatePage">
      <MobileHeader title={t('FriendUpdatePage.title')} back />
      <CommonContainer>{friend ? <FriendForm friend={friend} onComplete={onComplete} /> : <Loading />}</CommonContainer>
    </div>
  );
}
