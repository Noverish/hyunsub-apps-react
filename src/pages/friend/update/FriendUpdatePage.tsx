import { t } from 'i18next';
import { Navigate } from 'react-router-dom';

import FriendUpdateHooks from './FriendUpdateHooks';
import friendDetailApi from 'src/api/friend/friend-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import FriendForm from 'src/components/friend/FriendForm';
import { useUrlParams } from 'src/hooks/url-params';
import CommonRoutes from 'src/pages/common/CommonRoutes';

export default function FriendUpdatePage() {
  const [friendId] = useUrlParams('friendId');
  const { data, isLoading } = friendDetailApi.useApiResult({ friendId });
  const update = FriendUpdateHooks.useUpdate();

  let content = <></>;
  if (isLoading) {
    content = <Loading />;
  } else if (data) {
    content = <FriendForm friend={data} onComplete={update} />;
  } else {
    content = <Navigate to={CommonRoutes.notFound} replace />;
  }

  return (
    <CommonLayout className="FriendUpdatePage" title={t('FriendUpdatePage.title')} back>
      {content}
    </CommonLayout>
  );
}
