import { t } from 'i18next';

import FriendRoutes from '../FriendRoutes';
import FriendPreviewItem from './components/FriendPreviewItem';
import friendListApi from 'src/api/friend/friend-list';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import router from 'src/pages/router';
import { setDocumentTitle } from 'src/utils/services';

export default function FriendListPage() {
  setDocumentTitle(t('FriendListPage.title'));

  const { data: friends } = friendListApi.useApiResult({});

  const items = (friends ?? []).map((v) => <FriendPreviewItem key={v.id} friend={v} />);

  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      onClick: () => router.navigate(FriendRoutes.createRoute),
    },
  ];

  return (
    <div className="FriendListPage">
      <MobileHeader title={t('FriendListPage.title')} btns={headerBtns} />
      <CommonContainer>{friends ? <div className="d-grid gap-3">{items}</div> : <Loading />}</CommonContainer>
    </div>
  );
}
