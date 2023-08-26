import { t } from 'i18next';
import { useContext } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

import { ProfileProvider } from './ProfileContext';
import ProfileHooks from './ProfileHooks';
import profileDetailApi from 'src/api/auth/profile-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { ProfileContext } from 'src/pages/auth/profile/ProfileContext';
import ModifyPasswordModal from 'src/pages/auth/profile/components/ModifyPasswordModal';
import ModifyUsernameModal from 'src/pages/auth/profile/components/ModifyUsernameModal';
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
  const setState = useContext(ProfileContext)[1];
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
          <Button variant="warning" href="/logout">
            {t('auth.logout')}
          </Button>
          <Button variant="danger" onClick={onSignOut}>
            {t('auth.sign-out')}
          </Button>
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