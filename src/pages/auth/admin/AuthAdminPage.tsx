import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import UserDeleteCard from './components/UserDeleteCard';
import AdminUserListPanel from 'src/components/auth/AdminUserListPanel';
import UserCreateCard from 'src/pages/auth/admin/components/UserCreateCard';

export default function AuthAdminPage() {
  useEffect(() => {
    document.title = '어드민 페이지';
  }, []);

  return (
    <div id="AuthAdminPage">
      <Container>
        <h1 className="pt-3">어드민 페이지</h1>
        <div className="d-grid gap-3">
          <UserCreateCard />
          <UserDeleteCard />
          <AdminUserListPanel />
        </div>
      </Container>
    </div>
  );
}
