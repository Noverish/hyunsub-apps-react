import { Badge } from 'react-bootstrap';

import { FriendPreview } from 'src/model/friend';

interface Props {
  small?: boolean;
  meetFriends: FriendPreview[];
}

export default function DiaryMeetFriendView({ small, meetFriends }: Props) {
  if (meetFriends.length === 0) {
    return <></>;
  }

  const friends = meetFriends.map((v) => (
    <Badge bg="secondary" key={v.id}>
      {v.name}
    </Badge>
  ));

  const className = small ? 'd-flex fs-5 gap-1 mb-1' : 'd-flex fs-4 gap-2 mb-2';

  return <div className={className}>{friends}</div>;
}
