import { t } from 'i18next';

import FriendUpdateHooks from './FriendUpdateHooks';
import friendDetailApi from 'src/api/friend/friend-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import FriendForm from 'src/components/friend/FriendForm';
import { useUrlParams } from 'src/hooks/url-params';

export default function FriendUpdatePage() {
  const [friendId] = useUrlParams('friendId');
  const { data: friend } = friendDetailApi.useApiResult({ friendId });
  const update = FriendUpdateHooks.useUpdate();

  return (
    <CommonLayout className="FriendUpdatePage" title={t('FriendUpdatePage.title')} back>
      {friend ? <FriendForm friend={friend} onComplete={update} /> : <Loading />}
    </CommonLayout>
  );
}
