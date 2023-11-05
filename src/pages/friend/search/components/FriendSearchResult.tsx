import { t } from 'i18next';

import friendSearchApi from 'src/api/friend/friend-search';
import FriendPreviewList from 'src/components/friend/FriendPreviewList';
import CommonPageHooks from 'src/hooks/common/CommonPageHooks';

interface Props {
  query: string;
}

export default function FriendSearchResult({ query }: Props) {
  const { page, setPage } = CommonPageHooks.usePage();
  const { data } = friendSearchApi.useApiResult({ page, query });

  return (
    <div>
      <h3>{t('FriendSearchPage.result-num', [data?.total ?? 0])}</h3>
      <FriendPreviewList data={data} page={page} setPage={setPage} />
    </div>
  );
}
