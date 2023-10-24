import { Badge } from 'react-bootstrap';
import { Friend } from 'src/model/friend';

import './FriendDetailView.scss';

interface Props {
  friend: Friend;
}

export default function FriendDetailView({ friend }: Props) {
  const tags = friend.tags.map(v => <Badge key={v}>{v}</Badge>)

  return (
    <div className="FriendDetailView">
      <h1>{friend.name}</h1>
      <hr />
      <div>{friend.birthday}</div>
      <div className="tag_container">{tags}</div>
      <div className="description">{friend.description}</div>
    </div>
  );
}
