import { t } from 'i18next';
import { Navigate } from 'react-router-dom';

import FriendRoutes from '../FriendRoutes';
import FriendDetailHooks from './FriendDetailHooks';
import FriendDetailView from './components/FriendDetailView';
import friendDetailApi from 'src/api/friend/friend-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { HeaderButton } from 'src/model/component';
import CommonRoutes from 'src/pages/common/CommonRoutes';
import router from 'src/pages/router';

export default function FriendDetailPage() {
  const { friendId } = FriendDetailHooks.usePageParams();
  const { data, isLoading } = friendDetailApi.useApiResult({ friendId });

  // functions
  const remove = FriendDetailHooks.useDelete();

  // elements
  const mobileHeaderBtns: HeaderButton[] = [
    {
      icon: 'fas fa-edit',
      name: t('edit'),
      onClick: () => router.navigate(FriendRoutes.update(friendId)),
    },
    {
      icon: 'fas fa-trash-alt',
      name: t('delete'),
      onClick: () => (data ? remove(data) : undefined),
    },
  ];

  let content = <></>;
  if (isLoading) {
    content = <Loading />;
  } else if (data) {
    content = <FriendDetailView friend={data} />;
  } else {
    content = <Navigate to={CommonRoutes.notFound} replace />;
  }

  return (
    <CommonLayout
      className="FriendDetailPage"
      title={t('FriendDetailPage.title')}
      btns={data ? mobileHeaderBtns : undefined}
      back
    >
      {content}
    </CommonLayout>
  );
}
