import { t } from 'i18next';
import { useContext } from 'react';

import { DutchSettleContext, DutchSettleProvider } from './DutchSettleContext';
import DutchSettleForm from './components/DutchSettleForm';
import DutchSettleResultView from './components/DutchSettleResultView';
import CommonLayout from 'src/components/common/layout/CommonLayout';

function DutchSettlePage() {
  const [{ settleResult }] = useContext(DutchSettleContext);

  return (
    <CommonLayout className="DutchSettlePage" title={t('DutchNavigation.settle')}>
      <DutchSettleForm />
      <hr />
      {settleResult && <DutchSettleResultView result={settleResult} />}
    </CommonLayout>
  );
}

export default function DutchSettleIndex() {
  return (
    <DutchSettleProvider>
      <DutchSettlePage />
    </DutchSettleProvider>
  );
}
