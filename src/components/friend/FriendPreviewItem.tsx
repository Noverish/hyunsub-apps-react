import { Card } from 'react-bootstrap';

import FriendRoutes from '../../pages/friend/FriendRoutes';
import { FriendPreview } from 'src/model/friend';
import router from 'src/pages/router';

interface Props {
  friend: FriendPreview;
}

export default function FriendPreviewItem({ friend }: Props) {
  const onClick = () => {
    router.navigate(FriendRoutes.detail({ friendId: friend.id }));
  };

  return (
    <Card className="FriendPreviewItem" onClick={onClick}>
      <Card.Body>{friend.name}</Card.Body>
    </Card>
  );
}
