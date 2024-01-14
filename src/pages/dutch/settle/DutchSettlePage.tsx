import { t } from 'i18next';
import { useContext, useEffect, useState } from 'react';

import DutchSettleHooks from './DutchSettleHooks';
import DutchSettleResultView from './component/DutchSettleResultView';
import dutchSettleApi from 'src/api/dutch/dutch-settle';
import { Loading2 } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import DutchMemberDropdown from 'src/components/dutch/form/DutchMemberDropdown';
import { DutchContext } from 'src/context/dutch/DutchContext';
import { DutchMember } from 'src/model/dutch';

export default function DutchSettlePage() {
  const { members } = useContext(DutchContext);
  const { tripId } = DutchSettleHooks.usePageParams();
  const [mainMember, setMainMember] = useState<DutchMember | undefined>(members[0]);

  useEffect(() => {
    setMainMember(members[0]);
  }, [members]);

  const { data, isLoading } = dutchSettleApi.useApiResult(
    { tripId, mainMemberId: mainMember?.id ?? '' },
    { enabled: !!mainMember },
  );

  const elements = data?.map((v) => <DutchSettleResultView key={v.currency} result={v} />);

  return (
    <CommonLayout className="DutchSettlePage" title={t('DutchNavigation.settle')}>
      <div className="d-flex gap-3 align-items-center">
        <div className="fs-4">{t('DutchSettlePage.leader')}</div>
        <DutchMemberDropdown value={mainMember} onSelect={setMainMember} />
      </div>
      <hr />
      <Loading2 isLoading={isLoading}>
        <div className="d-grid gap-3">{elements}</div>
        <hr />
      </Loading2>
    </CommonLayout>
  );
}
