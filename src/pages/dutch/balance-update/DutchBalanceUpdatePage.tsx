import { t } from 'i18next';

import DutchBalanceUpdateHooks from './DutchBalanceUpdateHooks';
import DutchBalanceForm from './components/DutchBalanceForm';
import dutchBalanceListApi from 'src/api/dutch/dutch-balance-list';
import { Loading2 } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';

export default function DutchBalanceUpdatePage() {
  const { tripId } = DutchBalanceUpdateHooks.usePageParams();

  const { data, isLoading } = dutchBalanceListApi.useApiResult({ tripId });

  return (
    <CommonLayout className="DutchBalanceUpdatePage" title={t('DutchBalanceUpdatePage.title')} back>
      <Loading2 isLoading={isLoading}>{data && <DutchBalanceForm list={data} />}</Loading2>
    </CommonLayout>
  );
}
