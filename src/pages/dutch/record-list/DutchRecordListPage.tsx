import { t } from 'i18next';

import DutchRoutes from '../DutchRoutes';
import { DutchRecordListContext, DutchRecordListProvider } from './DutchRecordListContext';
import DutchRecordListHooks from './DutchRecordListHooks';
import dutchRecordSearchApi from 'src/api/dutch/dutch-record-search';
import { useFlattenPageData, useTotal } from 'src/api/generate-infinite-query';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import SearchResultWrapper from 'src/components/common/search/SearchResultWrapper';
import DutchRecordList from 'src/components/dutch/DutchRecordList';
import { HeaderButton } from 'src/model/component';
import DutchRecordSearchModal from 'src/pages/dutch/record-list/components/DutchRecordSearchModal';
import router from 'src/pages/router';
import { useContextSetter } from 'src/utils/context';

function DutchRecordListPage() {
  const { tripId, query, currency } = DutchRecordListHooks.usePageParams();
  const setState = useContextSetter(DutchRecordListContext);
  const { data, fetchNextPage, isFetching } = dutchRecordSearchApi.useInfiniteApi(
    { tripId, query, currency },
    { suspense: false },
  );
  const records = useFlattenPageData(data);
  const total = useTotal(data);
  const queryText = [query, currency].filter((v) => !!v).join(',');

  const headerBtns: HeaderButton[] = [
    {
      icon: 'fas fa-search',
      name: t('search'),
      onClick: () => setState({ showSearch: true }),
    },
    {
      icon: 'fas fa-plus',
      name: t('add'),
      onClick: () => router.navigate(DutchRoutes.recordCreate({ tripId })),
    },
  ];

  return (
    <CommonLayout className="DutchRecordListPage" title={t('DutchRecordListPage.title')} btns={headerBtns}>
      <SearchResultWrapper query={queryText} total={total} isFetching={isFetching} fetchNextPage={fetchNextPage}>
        <DutchRecordList tripId={tripId} records={records} />
      </SearchResultWrapper>
      <DutchRecordSearchModal />
    </CommonLayout>
  );
}

export default function DutchRecordListIndex() {
  return (
    <DutchRecordListProvider>
      <DutchRecordListPage />
    </DutchRecordListProvider>
  );
}
