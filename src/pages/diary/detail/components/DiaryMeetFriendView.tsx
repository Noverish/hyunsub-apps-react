import { t } from 'i18next';
import { Badge } from 'react-bootstrap';

import { MeetFriend } from 'src/model/friend';

interface Props {
  meetFriends: MeetFriend[];
}

export default function DiaryMeetFriendView({ meetFriends }: Props) {
  const friends = meetFriends.map((v) => <Badge bg="secondary" key={v.friendId}>{v.name}</Badge>);

  return (
    <div>
      <hr />
      <h3>{t('DiaryDetailPage.friends')}</h3>
      <h4>{friends}</h4>
    </div>
  );
}
