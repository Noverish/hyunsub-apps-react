import { t } from 'i18next';

import FriendTagDetailHooks from './FriendTagDetailHooks';
import friendTagDetailApi from 'src/api/friend/friend-tag-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import FriendPreviewList from 'src/components/friend/FriendPreviewList';
import { setDocumentTitle } from 'src/utils/services';

export default function FriendTagDetailPage() {
  const { tag } = FriendTagDetailHooks.usePageData();
  const title = t('FriendTagDetailPage.title', [tag]);
  setDocumentTitle(title);

  const { data } = friendTagDetailApi.useApiResult({ tag });

  return (
    <div className="FriendTagDetailPage">
      <MobileHeader title={title} back />
      <CommonContainer>
        <h1 className="mb-3">{tag}</h1>
        {data ? <FriendPreviewList list={data.friends} /> : <Loading />}
      </CommonContainer>
    </div>
  );
}
