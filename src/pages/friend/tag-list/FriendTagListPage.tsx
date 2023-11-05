import { t } from 'i18next';

import CommonLayout from 'src/components/common/layout/CommonLayout';
import FriendTagList from 'src/pages/friend/tag-list/components/FriendTagList';

export default function FriendTagListPage() {
  return (
    <CommonLayout className="FriendTagListPage" title={t('FriendTagListPage.title')}>
      <FriendTagList />
    </CommonLayout>
  );
}
