import { t } from 'i18next';

import DutchMemberSelectHooks from './DutchMemberSelectHooks';
import dutchMembersApi from 'src/api/dutch/dutch-members';
import { Loading2 } from 'src/components/common/LoadingSuspense';
import DutchMemberSelectItem from 'src/pages/dutch/member-select/components/DutchMemberSelectItem';

import './DutchMemberSelectPage.scss';

export default function DutchMemberSelectPage() {
  const { tripId } = DutchMemberSelectHooks.usePageParams();

  const { data, isLoading } = dutchMembersApi.useApiResult({ tripId });

  const elements = (data ?? []).map((v) => <DutchMemberSelectItem key={v.id} member={v} />);

  return (
    <div className="DutchMemberSelectPage">
      <Loading2 isLoading={isLoading}>
        <h4>{t('DutchMemberSelectPage.message.choose')}</h4>
        {elements}
      </Loading2>
    </div>
  );
}
