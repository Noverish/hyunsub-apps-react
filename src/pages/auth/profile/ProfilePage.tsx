import { t } from 'i18next';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AuthRoutes from '../AuthRoutes';
import { ProfileProvider } from './ProfileContext';
import ProfileHooks from './ProfileHooks';
import LanguageSelect from './components/LanguageSelect';
import profileDetailApi from 'src/api/auth/profile-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { useIsAdmin } from 'src/hooks/token';
import { ProfileContext } from 'src/pages/auth/profile/ProfileContext';
import ModifyPasswordModal from 'src/pages/auth/profile/components/ModifyPasswordModal';
import ModifyUsernameModal from 'src/pages/auth/profile/components/ModifyUsernameModal';
import { useContextSetter } from 'src/utils/context';
import { setDocumentTitle } from 'src/utils/services';

import './ProfilePage.scss';

function ListItem({ name, value, btn, onClick }: { name: string; value: string; btn: string; onClick?: () => void }) {
  return (
    <ListGroup.Item>
      <span className="key">{name}</span>
      <span>{value}</span>
      <Button size="sm" onClick={onClick}>
        {btn}
      </Button>
    </ListGroup.Item>
  );
}

function ProfilePage() {
  setDocumentTitle(t('auth.my-page.title'));

  // hooks
  const isAdmin = useIsAdmin();
  const setState = useContextSetter(ProfileContext);
  const userInfo = profileDetailApi.useApi({});
  const onSignOut = ProfileHooks.useWithdraw();

  // functions
  const onUsernameBtnClick = () => setState({ showUsernameModal: true });
  const onPasswordBtnClick = () => setState({ showPasswordModal: true });

  return (
    <div className="ProfilePage">
      <MobileHeader title={t('auth.my-page.title')} back />
      <CommonContainer>
        <div className="d-grid gap-3">
          <Card>
            <Card.Header>{t('auth.my-page.login-info')}</Card.Header>
            <ListGroup variant="flush">
              <ListItem name={t('auth.id')} value={userInfo.username} btn={t('modify')} onClick={onUsernameBtnClick} />
              <ListItem name={t('auth.pw')} value="*******" btn={t('modify')} onClick={onPasswordBtnClick} />
            </ListGroup>
          </Card>
          <Card>
            <Card.Header>{t('auth.my-page.login-status')}</Card.Header>
            <ListGroup variant="flush">
              <ListItem
                name={t('auth.my-page.login-history')}
                value={t('auth.my-page.login-history-num', [userInfo.historyNum])}
                btn={t('view')}
              />
              <ListItem
                name={t('auth.my-page.login-device')}
                value={t('auth.my-page.login-device-num', [userInfo.deviceNum])}
                btn={t('view')}
              />
            </ListGroup>
          </Card>
          <Card>
            <Card.Header>{t('auth.ProfilePage.language')}</Card.Header>
            <Card.Body>
              <LanguageSelect />
            </Card.Body>
          </Card>
          <Button variant="warning" href="/logout">
            {t('auth.logout')}
          </Button>
          <Button variant="danger" onClick={onSignOut}>
            {t('auth.sign-out')}
          </Button>
          {isAdmin ? (
            <Link to={AuthRoutes.admin} className="d-grid">
              <Button variant="primary">Admin</Button>
            </Link>
          ) : undefined}
        </div>
      </CommonContainer>
    </div>
  );
}

export default function MyIndex() {
  profileDetailApi.useApi({});

  return (
    <ProfileProvider>
      <ProfilePage />
      <ModifyUsernameModal />
      <ModifyPasswordModal />
    </ProfileProvider>
  );
}
