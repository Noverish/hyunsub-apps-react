import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FriendRoutes from '../../FriendRoutes';
import { FriendTagsContext } from 'src/context/friend/FriendTagsContext';

export default function FriendTagList() {
  const { tags } = useContext(FriendTagsContext);

  const elements = tags.map((v) => (
    <ListGroup.Item key={v.name} as={Link} to={FriendRoutes.tagDetail(v.name)}>
      {v.name} ({v.count})
    </ListGroup.Item>
  ));

  return <ListGroup className="FriendTagList">{elements}</ListGroup>;
}
