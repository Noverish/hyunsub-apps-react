import { t } from 'i18next';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FriendRoutes from '../../FriendRoutes';
import { Friend } from 'src/model/friend';

import './FriendDetailView.scss';

interface Props {
  friend: Friend;
}

export default function FriendDetailView({ friend }: Props) {
  const { name, birthday, tags, description, meets } = friend;

  const tagItems = tags.map((v) => (
    <Link key={v} to={FriendRoutes.tagDetail(v)}>
      <Badge>{v}</Badge>
    </Link>
  ));

  const meetItems = meets.map((v) => (
    <a key={v} href={`https://diary.hyunsub.kim/detail/${v}`} target="_blank" rel="noopener noreferrer">
      <Badge>{v}</Badge>
    </a>
  ));

  const descriptionItems = (description ?? '').split('\n').flatMap((v, i) => {
    const item = <span key={`d${i}`}>{v}</span>;
    const br = <br key={`b${i}`} />;
    return i ? [br, item] : [item];
  });

  return (
    <div className="FriendDetailView">
      <h1>{name}</h1>
      <hr />
      <dl>
        {birthday && (
          <>
            <dt>{t('FriendForm.birthday')}</dt>
            <dd>{birthday}</dd>
          </>
        )}
        {tags.length > 0 && (
          <>
            <dt>{t('FriendForm.tags')}</dt>
            <dd className="tag_container">{tagItems}</dd>
          </>
        )}
        {description && (
          <>
            <dt>{t('FriendForm.description')}</dt>
            <dd className="description">{descriptionItems}</dd>
          </>
        )}
        {meets.length > 0 && (
          <>
            <dt>{t('FriendForm.meets')}</dt>
            <dd className="meet_container">{meetItems}</dd>
          </>
        )}
      </dl>
    </div>
  );
}
