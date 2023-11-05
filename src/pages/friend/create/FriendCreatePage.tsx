import { t } from 'i18next';

import FriendCreateHooks from './FriendCreateHooks';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import FriendForm from 'src/components/friend/FriendForm';

export default function FriendCreatePage() {
  const create = FriendCreateHooks.useCreate();

  return (
    <CommonLayout className="FriendCreatePage" title={t('FriendCreatePage.title')} back>
      <FriendForm onComplete={create} />
    </CommonLayout>
  );
}
