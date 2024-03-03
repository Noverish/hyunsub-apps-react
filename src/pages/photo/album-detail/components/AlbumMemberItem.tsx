import { Button } from 'react-bootstrap';

import { AlbumMember } from 'src/model/photo';

interface Props {
  member: AlbumMember;
  disabled?: boolean;
}

export default function AlbumMemberItem(props: Props) {
  const { member, disabled } = props;

  return (
    <Button className="AlbumMemberItem" size="sm" disabled={disabled} variant={disabled ? 'secondary' : 'primary'}>
      {member.name}
    </Button>
  );
}
