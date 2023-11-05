import { t } from 'i18next';

import friendTagFriendsApi from 'src/api/friend/friend-tag-friends';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import FriendPreviewList from 'src/components/friend/FriendPreviewList';
import CommonPageHooks from 'src/hooks/common/CommonPageHooks';
import { useUrlParams } from 'src/hooks/url-params';

export default function FriendTagDetailPage() {
  const [tag] = useUrlParams('tag');
  const { page, setPage } = CommonPageHooks.usePage();

  const { data } = friendTagFriendsApi.useApiResult({ tag, p: page });

  return (
    <CommonLayout className="FriendTagDetailPage" title={t('FriendTagDetailPage.title', [tag])} back>
      <h1 className="mb-3">{tag}</h1>
      <FriendPreviewList data={data} page={page} setPage={setPage} />
    </CommonLayout>
  );
}
