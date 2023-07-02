import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import authorityListApi from 'src/api/auth/admin/authority-list';
import { useUserAuthorityCreate } from 'src/api/auth/admin/user-authority-create';
import { useUserAuthorityDelete } from 'src/api/auth/admin/user-authority-delete';
import { useUserDelete } from 'src/api/auth/admin/user-delete';
import userListApi from 'src/api/auth/admin/user-list';
import UserAuthoritySelect from 'src/components/auth/UserAuthoritySelect';
import UserSelect from 'src/components/auth/UserSelect';
import ApiResult from 'src/components/common/ApiResult';
import { AdminAuthority, AdminUser } from 'src/model/auth';

export default function UserManageCard() {
  const users = userListApi.useApi({});
  const [idNo, setIdNo] = useState<string>();

  const onSelect = (user?: AdminUser) => {
    setIdNo(user?.idNo);
  };

  const index = users.findIndex((v) => v.idNo === idNo);
  const user = index > 0 ? users[index] : undefined;

  return (
    <Card className="UserManageCard">
      <Card.Header>User Manage</Card.Header>
      <Card.Body>
        <UserSelect onSelect={onSelect} value={user} />
        {user && <UserManageCardInner user={user} />}
      </Card.Body>
    </Card>
  );
}

function UserManageCardInner({ user }: { user: AdminUser }) {
  const idNo = user.idNo;

  const [result, setResult] = useState<any>();
  const authorities = authorityListApi.useApi({}).filter((v) => user.authorities.includes(v.id));

  const userAuthorityCreate = useUserAuthorityCreate();
  const userAuthorityDelete = useUserAuthorityDelete();
  const userDelete = useUserDelete();

  const onAuthorityCreate = (authority: AdminAuthority) => {
    userAuthorityCreate({ idNo, authorityId: authority.id }).then((v) => setResult(v));
  };

  const onAuthorityDelete = (authority: AdminAuthority) => {
    userAuthorityDelete({ idNo, authorityId: authority.id }).then((v) => setResult(v));
  };

  const onUserDelete = () => {
    userDelete({ idNo }).then((v) => setResult(v));
  };

  return (
    <>
      <hr />
      <div>
        <div style={{ fontSize: '1.5rem' }}>
          [{idNo}] {user.username}
        </div>
        <Form.Group className="mt-1">
          <Form.Label>Authorities</Form.Label>
          <UserAuthoritySelect value={authorities} onSelect={onAuthorityCreate} onRemove={onAuthorityDelete} />
        </Form.Group>
        <div className="d-flex gap-2 mt-3">
          <Button>Login</Button>
          <Button variant="danger" onClick={onUserDelete}>
            Withdraw
          </Button>
        </div>
        {result && <ApiResult className="mt-3" result={result} />}
      </div>
    </>
  );
}
