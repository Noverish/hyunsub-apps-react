import { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';

import { DutchContext } from 'src/context/dutch/DutchContext';

import './DutchMemberSelectModal.scss';

interface Props {
  alreadySelectedMemberIds: string[];
  onSelect: (memberIds: string[]) => void;
  defaultAllSelect?: boolean;
  show: boolean;
}

export default function DutchMemberSelectModal(props: Props) {
  const { onSelect, alreadySelectedMemberIds, defaultAllSelect, show } = props;

  const { members } = useContext(DutchContext);
  const remainMembers = members.filter((v) => !alreadySelectedMemberIds.includes(v.id));

  const remainMemberIds = remainMembers.map((v) => v.id);
  const [selects, setSelects] = useState<string[]>(defaultAllSelect ? remainMemberIds : []);

  const onHide = () => {
    onSelect(selects);
  };

  const generateItemClick = (memberId: string) => () => {
    const exist = selects.includes(memberId);
    const newSelects = exist ? selects.filter((v) => v !== memberId) : [...selects, memberId];
    setSelects(newSelects);
  };

  const elements = remainMembers.map((v) => {
    const selected = selects.includes(v.id);
    const iconClass = selected ? 'fas fa-check-square' : 'far fa-square';

    return (
      <div key={v.id} className="p-3 hyunsub_border_flush" onClick={generateItemClick(v.id)}>
        <i className={iconClass} />
        <span>{v.name}</span>
      </div>
    );
  });

  return (
    <Modal className="DutchMemberSelectModal" show={show} onHide={onHide} centered>
      {elements}
    </Modal>
  );
}
