import { t } from 'i18next';

import DutchRoutes from '../DutchRoutes';
import DutchSpendHooks from './DutchSpendHooks';
import DutchSpendList from './components/DutchSpendList';
import dutchSpendListhApi from 'src/api/dutch/dutch-spend-list';
import dutchSpendSumApi from 'src/api/dutch/dutch-spend-sum';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import SearchResultWrapper from 'src/components/common/search/SearchResultWrapper';
import { HeaderButton } from 'src/model/component';
import DutchSpendSumView from 'src/pages/dutch/spend/components/DutchSpendSumView';
import router from 'src/pages/router';

export default function DutchSpendPage() {
  const { tripId } = DutchSpendHooks.usePageParams();

  const result = dutchSpendListhApi.useInfiniteApi({ tripId }, { suspense: false });
  const spends = useFlattenPageData(result.data);

  const { data: sums } = dutchSpendSumApi.useApiResult({ tripId });

  const headerBtns: HeaderButton[] = [
    {
      icon: 'fas fa-user-friends',
      name: t('DutchSpendPage.select-member'),
      onClick: () => router.navigate(DutchRoutes.memberSelect({ tripId })),
    },
  ];

  return (
    <CommonLayout className="DutchSpendPage" title={t('DutchNavigation.balance')} btns={headerBtns}>
      {sums && <DutchSpendSumView sums={sums} />}
      <SearchResultWrapper result={result}>
        <DutchSpendList spends={spends} />
      </SearchResultWrapper>
    </CommonLayout>
  );
}
