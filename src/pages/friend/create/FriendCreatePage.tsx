import { t } from 'i18next';

import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import FriendForm from 'src/components/friend/FriendForm';
import { Friend } from 'src/model/friend';
import { setDocumentTitle } from 'src/utils/services';

export default function FriendCreatePage() {
  setDocumentTitle(t('FriendCreatePage.title'));

  const onComplete = (friend: Friend) => {
    console.log(friend);
  };

  return (
    <div className="FriendCreatePage">
      <MobileHeader title={t('FriendCreatePage.title')} back />
      <CommonContainer>
        <FriendForm onComplete={onComplete} />
      </CommonContainer>
    </div>
  );
}
