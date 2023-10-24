import { t } from 'i18next';

import FriendRoutes from '../FriendRoutes';
import FriendPreviewItem from './components/FriendPreviewItem';
import friendListApi from 'src/api/friend/friend-list';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import router from 'src/pages/router';
import { setDocumentTitle } from 'src/utils/services';

export default function FriendListPage() {
  setDocumentTitle(t('FriendListPage.title'));

  const friends = friendListApi.useApi({});

  const items = friends.map((v) => <FriendPreviewItem key={v.id} friend={v} />);

  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      onClick: () => router.navigate(FriendRoutes.createRoute),
    },
  ];

  return (
    <div className="FriendListPage">
      <MobileHeader title={t('FriendListPage.title')} btns={headerBtns} />
      <CommonContainer>
        <div className="d-grid gap-3">{items}</div>
      </CommonContainer>
    </div>
  );
}
