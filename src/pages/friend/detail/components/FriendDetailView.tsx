import { t } from 'i18next';
import { Badge } from 'react-bootstrap';

import { Friend } from 'src/model/friend';

import './FriendDetailView.scss';

interface Props {
  friend: Friend;
}

export default function FriendDetailView({ friend }: Props) {
  const tags = friend.tags.map((v) => <Badge key={v}>{v}</Badge>);

  return (
    <div className="FriendDetailView">
      <h1>{friend.name}</h1>
      <hr />
      <dl>
        <dt>{t('FriendForm.birthday')}</dt>
        <dd>{friend.birthday}</dd>
        <dt>{t('FriendForm.tags')}</dt>
        <dd className="tag_container">{tags}</dd>
        <dt>{t('FriendForm.description')}</dt>
        <dd className="description">{friend.description}</dd>
      </dl>
    </div>
  );
}
