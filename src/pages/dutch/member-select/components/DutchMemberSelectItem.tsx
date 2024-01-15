import { Card } from 'react-bootstrap';

import { DutchMember } from 'src/model/dutch';

interface Props {
  member: DutchMember;
}

export default function DutchMemberSelectItem({ member }: Props) {
  return (
    <Card className="DutchMemberSelectItem gray_on_hover">
      <Card.Body>{member.name}</Card.Body>
    </Card>
  );
}
