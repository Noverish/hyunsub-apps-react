import { t } from 'i18next';

import FriendRoutes from '../FriendRoutes';
import friendListApi from 'src/api/friend/friend-list';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import FriendPreviewList from 'src/components/friend/FriendPreviewList';
import router from 'src/pages/router';
import { setDocumentTitle } from 'src/utils/services';

export default function FriendListPage() {
  setDocumentTitle(t('FriendListPage.title'));

  const { data: friends } = friendListApi.useApiResult({});

  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      onClick: () => router.navigate(FriendRoutes.createRoute),
    },
  ];

  return (
    <div className="FriendListPage">
      <MobileHeader title={t('FriendListPage.title')} btns={headerBtns} />
      <CommonContainer>{friends ? <FriendPreviewList list={friends} /> : <Loading />}</CommonContainer>
    </div>
  );
}
