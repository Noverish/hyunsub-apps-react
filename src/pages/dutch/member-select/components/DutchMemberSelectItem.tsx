import { Card } from 'react-bootstrap';

import DutchMemberSelectHooks from '../DutchMemberSelectHooks';
import { DutchMember } from 'src/model/dutch';

interface Props {
  member: DutchMember;
}

export default function DutchMemberSelectItem({ member }: Props) {
  const select = DutchMemberSelectHooks.useSelect();

  const onClick = () => {
    select(member);
  };

  return (
    <Card className="DutchMemberSelectItem gray_on_hover" onClick={onClick}>
      <Card.Body>{member.name}</Card.Body>
    </Card>
  );
}
