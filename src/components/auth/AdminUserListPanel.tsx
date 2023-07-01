import { useQueries } from '@tanstack/react-query';
import { Card, ListGroup } from 'react-bootstrap';

import AdminUserListItem from './AdminUserListItem';
import authorityListApi from 'src/api/auth/admin/authority-list';
import userListApi from 'src/api/auth/admin/user-list';

export default function AdminUserListPanel() {
  const result = useQueries({
    queries: [
      {
        queryKey: authorityListApi.key({}),
        queryFn: () => authorityListApi.api({}),
      },
      {
        queryKey: userListApi.key({}),
        queryFn: () => userListApi.api({}),
      },
    ],
  });

  const authorities = result[0].data;
  const users = result[1].data;
  if (!authorities || !users) {
    return <div />;
  }

  const rows = users.map((user) => <AdminUserListItem key={user.idNo} user={user} authorities={authorities} />);

  return (
    <Card style={{ overflow: 'visible' }}>
      <ListGroup variant="flush">{rows}</ListGroup>
    </Card>
  );
}
