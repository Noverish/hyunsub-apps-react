import { useQueries } from '@tanstack/react-query';
import { Card, ListGroup } from 'react-bootstrap';
import getAllAuthorities from 'src/api/auth/admin/all-authorities';
import getAllUsers from 'src/api/auth/admin/all-users';
import AdminUserListItem from './AdminUserListItem';

export default function AdminUserListPanel() {
  const result = useQueries({
    queries: [
      {
        queryKey: getAllAuthorities.key({}),
        queryFn: () => getAllAuthorities.api({}),
      },
      {
        queryKey: getAllUsers.key({}),
        queryFn: () => getAllUsers.api({}),
      }
    ],
  });

  const authorities = result[0].data;
  const users = result[1].data;
  if (!authorities || !users) {
    return <div />;
  }

  const rows = users.map(user => <AdminUserListItem key={user.idNo} user={user} authorities={authorities} />);

  return (
    <Card style={{ overflow: 'visible' }}>
      <ListGroup variant="flush">
        {rows}
      </ListGroup>
    </Card>
  )
}
