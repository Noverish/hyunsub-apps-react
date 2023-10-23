import { Badge } from 'react-bootstrap';

import { FriendPreview } from 'src/model/friend';

interface Props {
  meetFriends: FriendPreview[];
}

export default function DiaryMeetFriendView({ meetFriends }: Props) {
  const friends = meetFriends.map((v) => (
    <Badge bg="secondary" key={v.id}>
      {v.name}
    </Badge>
  ));

  return <div className="d-flex fs-4 gap-2 mb-2">{friends}</div>;
}
