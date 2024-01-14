import { t } from 'i18next';

import DiaryRoutes from '../DiaryRoutes';
import { DiaryListContext, DiaryListProvider } from './DiaryListContext';
import DiaryListHooks from './DiaryListHooks';
import DiarySearchModal from './components/DiarySearchModal';
import diarySearchApi from 'src/api/diary/diary-search';
import { useFlattenPageData, useTotal } from 'src/api/generate-infinite-query';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import SearchResultWrapper from 'src/components/common/search/SearchResultWrapper';
import DiaryPreviewList from 'src/components/diary/DiaryPreviewList';
import { HeaderButton } from 'src/model/component';
import router from 'src/pages/router';
import { useContextSetter } from 'src/utils/context';

function DiaryListPage() {
  const { query } = DiaryListHooks.usePageParams();
  const setState = useContextSetter(DiaryListContext);
  const { data, fetchNextPage, isFetching } = diarySearchApi.useInfiniteApi({ query }, { suspense: false });
  const diaries = useFlattenPageData(data);
  const total = useTotal(data);

  const headerBtns: HeaderButton[] = [
    {
      icon: 'fas fa-search',
      name: t('search'),
      onClick: () => setState({ showSearch: true }),
    },
    {
      icon: 'fas fa-plus',
      name: t('add'),
      onClick: () => router.navigate(DiaryRoutes.createRoute),
    },
  ];

  return (
    <CommonLayout className="DiaryListPage" title={t('DiaryListPage.title')} btns={headerBtns}>
      <SearchResultWrapper query={query} total={total} isFetching={isFetching} fetchNextPage={fetchNextPage}>
        <DiaryPreviewList diaries={diaries} />
      </SearchResultWrapper>
      <DiarySearchModal />
    </CommonLayout>
  );
}

export default function DiaryListIndex() {
  return (
    <DiaryListProvider>
      <DiaryListPage />
    </DiaryListProvider>
  );
}
