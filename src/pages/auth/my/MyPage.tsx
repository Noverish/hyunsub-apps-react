import { RefObject, useEffect, useRef } from "react";
import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ModifyPasswordModal from "src/components/auth/ModifyPasswordModal";
import ModifyUsernameModal from "src/components/auth/ModifyUsernameModal";

import './MyPage.scss';

function ListItem({ name, value, btn, btnRef }: { name: string, value: string, btn: string, btnRef?: RefObject<HTMLButtonElement> }) {
  return (
    <ListGroup.Item>
      <span className="key">{name}</span>
      <span>{value}</span>
      <Button size="sm" ref={btnRef}>{btn}</Button>
    </ListGroup.Item>
  )
}

export default function MyPage() {
  const { t } = useTranslation();
  const usernameBtnRef = useRef<HTMLButtonElement>(null);
  const passwordBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.document.title = t('auth.my-page.title');
  }, [t]);

  return (
    <div id="MyPage">
      <Container>
        <h1>{t('auth.my-page.title')}</h1>
        <div className="d-grid gap-3">
          <Card>
            <Card.Header>{t('auth.my-page.login-info')}</Card.Header>
            <ListGroup variant="flush">
              <ListItem name={t('auth.id')} value="embrapers263" btn={t('modify')} btnRef={usernameBtnRef} />
              <ListItem name={t('auth.pw')} value="********" btn={t('modify')} btnRef={passwordBtnRef} />
            </ListGroup>
          </Card>
          <Card>
            <Card.Header>{t('auth.my-page.login-status')}</Card.Header>
            <ListGroup variant="flush">
              <ListItem name={t('auth.my-page.login-history')} value={t('auth.my-page.login-history-num', [32])} btn={t('view')} />
              <ListItem name={t('auth.my-page.login-device')} value={t('auth.my-page.login-device-num', [1])} btn={t('view')} />
            </ListGroup>
          </Card>
          <div>
            <Button variant="danger">{t('auth.withdraw')}</Button>
          </div>
        </div>
      </Container>
      <ModifyUsernameModal btnRef={usernameBtnRef} username="embrapers263" />
      <ModifyPasswordModal btnRef={passwordBtnRef} />
    </div>
  )
}
