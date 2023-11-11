import { t } from 'i18next';

import CommonLayout from 'src/components/common/layout/CommonLayout';
import { useUrlParams } from 'src/hooks/url-params';
import FriendTagDetailResult from 'src/pages/friend/tag-detail/components/FriendTagDetailResult';

export default function FriendTagDetailPage() {
  const [tag] = useUrlParams('tag');

  return (
    <CommonLayout className="FriendTagDetailPage" title={t('FriendTagDetailPage.title', [tag])} back>
      <FriendTagDetailResult tag={tag} />
    </CommonLayout>
  );
}
