import { useContext } from 'react';

import CustomDropdown from 'src/components/common/select/CustomDropdown';
import { DutchContext } from 'src/context/dutch/DutchContext';
import { DutchMember } from 'src/model/dutch';

interface Props {
  value?: DutchMember;
  onSelect: (member: DutchMember) => void;
}

export default function DutchMemberDropdown({ value, onSelect }: Props) {
  const { members } = useContext(DutchContext);

  return <CustomDropdown value={value} data={members} labelSelector={(v) => v.name} onSelect={(v) => onSelect(v)} />;
}
