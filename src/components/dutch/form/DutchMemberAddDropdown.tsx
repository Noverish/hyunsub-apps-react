import { t } from 'i18next';
import { useContext } from 'react';

import CustomDropdown from 'src/components/common/select/CustomDropdown';
import { DutchContext } from 'src/context/dutch/DutchContext';
import { DutchMember } from 'src/model/dutch';

interface Props {
  alreadySelectedMemberIds: string[];
  onSelect: (member: DutchMember) => void;
}

export default function DutchMemberAddDropdown({ onSelect, alreadySelectedMemberIds }: Props) {
  const { members } = useContext(DutchContext);
  const remainMembers = members.filter((v) => !alreadySelectedMemberIds.includes(v.id));

  return (
    <CustomDropdown
      data={remainMembers}
      labelSelector={(v) => v.name}
      onChange={(v) => onSelect(v)}
      noSelectionLabel={t('add')}
    />
  );
}
