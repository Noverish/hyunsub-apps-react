import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AdminUserListPanel from 'src/components/auth/AdminUserListPanel';

export default function AuthAdminPage() {
  useEffect(() => {
    document.title = '어드민 페이지';
  }, []);

  return (
    <div id="AuthAdminPage">
      <Container>
        <h1 className="pt-3">유저 목록</h1>
        <AdminUserListPanel />
      </Container>
    </div>
  );
}
