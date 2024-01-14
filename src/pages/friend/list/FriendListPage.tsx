import { t } from 'i18next';

import FriendRoutes from '../FriendRoutes';
import { FriendListContext, FriendListProvider } from './FriendListContext';
import FriendListHooks from './FriendListHooks';
import FriendSearchModal from './components/FriendSearchModal';
import friendSearchApi from 'src/api/friend/friend-search';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import SearchResultWrapper from 'src/components/common/search/SearchResultWrapper';
import FriendPreviewList from 'src/components/friend/FriendPreviewList';
import { HeaderButton } from 'src/model/component';
import router from 'src/pages/router';
import { useContextSetter } from 'src/utils/context';

function FriendListPage() {
  const { query } = FriendListHooks.usePageParams();
  const setState = useContextSetter(FriendListContext);
  const result = friendSearchApi.useInfiniteApi({ query }, { suspense: false });
  const friends = useFlattenPageData(result.data);

  const headerBtns: HeaderButton[] = [
    {
      icon: 'fas fa-search',
      name: t('search'),
      onClick: () => setState({ showSearch: true }),
    },
    {
      icon: 'fas fa-plus',
      name: t('add'),
      onClick: () => router.navigate(FriendRoutes.createRoute),
    },
  ];

  return (
    <CommonLayout className="FriendListPage" title={t('FriendListPage.title')} btns={headerBtns}>
      <SearchResultWrapper query={query} result={result}>
        <FriendPreviewList friends={friends} />
      </SearchResultWrapper>
      <FriendSearchModal />
    </CommonLayout>
  );
}

export default function FriendListIndex() {
  return (
    <FriendListProvider>
      <FriendListPage />
    </FriendListProvider>
  );
}
