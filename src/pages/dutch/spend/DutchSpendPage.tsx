import { t } from 'i18next';

import DutchRoutes from '../DutchRoutes';
import DutchSpendHooks from './DutchSpendHooks';
import DutchSpendList from './components/DutchSpendList';
import dutchMyApi from 'src/api/dutch/dutch-my';
import dutchSpendListApi from 'src/api/dutch/dutch-spend-list';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import SearchResultWrapper from 'src/components/common/search/SearchResultWrapper';
import { HeaderButton } from 'src/model/component';
import router from 'src/pages/router';

export default function DutchSpendPage() {
  const { tripId } = DutchSpendHooks.usePageParams();

  const result = dutchSpendListApi.useInfiniteApi({ tripId }, { suspense: false });
  const spends = useFlattenPageData(result.data);

  const { data: my } = dutchMyApi.useApiResult({ tripId });

  const headerBtns: HeaderButton[] = [
    {
      icon: 'fas fa-sign-out-alt',
      name: t('logout'),
      onClick: () => router.navigate(DutchRoutes.memberSelect({ tripId })),
    },
  ];

  return (
    <CommonLayout className="DutchSpendPage" title={my?.name ?? ''} btns={headerBtns}>
      <SearchResultWrapper result={result}>
        <DutchSpendList spends={spends} />
      </SearchResultWrapper>
    </CommonLayout>
  );
}
