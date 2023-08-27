import UserManageCard from './components/UserManageCard';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import UserCreateCard from 'src/pages/auth/admin/components/UserCreateCard';
import { setDocumentTitle } from 'src/utils/services';

export default function AuthAdminPage() {
  setDocumentTitle('어드민 페이지');

  return (
    <div id="AuthAdminPage">
      <MobileHeader title="어드민 페이지" back />
      <CommonContainer>
        <h1>어드민 페이지</h1>
        <div className="d-grid gap-3">
          <UserCreateCard />
          <UserManageCard />
        </div>
      </CommonContainer>
    </div>
  );
}
