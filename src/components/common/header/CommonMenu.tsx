import { Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'src/redux';
import { logoutAction } from 'src/redux/actions';

export default function CommonMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutAction());
  }

  return (
    <div className="CommonMenu">
      <div className="d-grid gap-3">
        <a href="https://apps.hyunsub.kim" className="d-grid"><Button>Apps</Button></a>
        <Button variant="danger" onClick={onLogout}>{t('logout')}</Button>
      </div>
    </div>
  )
}
