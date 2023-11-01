import { t } from 'i18next';

import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import FriendTagList from 'src/pages/friend/tag-list/components/FriendTagList';
import { setDocumentTitle } from 'src/utils/services';

export default function FriendTagListPage() {
  setDocumentTitle(t('FriendTagListPage.title'));

  return (
    <div className="FriendTagListPage">
      <MobileHeader title={t('FriendTagListPage.title')} />
      <CommonContainer>
        <FriendTagList />
      </CommonContainer>
    </div>
  );
}
