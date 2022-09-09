import { useEffect } from "react";
import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ModifyPasswordModal from "src/components/auth/ModifyPasswordModal";
import ModifyUsernameModal from "src/components/auth/ModifyUsernameModal";
import LoadingPage from "src/pages/common/LoadingPage";
import { useDispatch, useSelector } from "src/redux";
import './MyPage.scss';
import {fetchMyPageUserInfo, signOutAction} from './MyPageContext';
import { updateMyPageState } from "./MyPageState";

function ListItem({ name, value, btn, onClick }: { name: string, value: string, btn: string, onClick?: () => void }) {
  return (
    <ListGroup.Item>
      <span className="key">{name}</span>
      <span>{value}</span>
      <Button size="sm" onClick={onClick}>{btn}</Button>
    </ListGroup.Item>
  )
}

export default function MyPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(s => s.auth.my);

  useEffect(() => {
    window.document.title = t('auth.my-page.title');
  }, [t]);

  useEffect(() => {
    dispatch(fetchMyPageUserInfo());
  }, [dispatch])

  const onUsernameBtnClick = () => dispatch(updateMyPageState({ showUsernameModal: true }));
  const onPasswordBtnClick = () => dispatch(updateMyPageState({ showPasswordModal: true }));
  const onSignOut = () => dispatch(signOutAction());

  if (!userInfo) {
    return <LoadingPage />;
  }

  return (
    <div id="MyPage">
      <Container>
        <h1>{t('auth.my-page.title')}</h1>
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
              <ListItem name={t('auth.my-page.login-history')} value={t('auth.my-page.login-history-num', [userInfo.historyNum])} btn={t('view')} />
              <ListItem name={t('auth.my-page.login-device')} value={t('auth.my-page.login-device-num', [userInfo.deviceNum])} btn={t('view')} />
            </ListGroup>
          </Card>
          <div>
            <Button variant="warning" href="/logout">{t('auth.logout')}</Button>
            <Button variant="danger" className="ms-3" onClick={onSignOut}>{t('auth.sign-out')}</Button>
          </div>
        </div>
      </Container>
      <ModifyUsernameModal userInfo={userInfo} />
      <ModifyPasswordModal userInfo={userInfo} />
    </div>
  )
}
