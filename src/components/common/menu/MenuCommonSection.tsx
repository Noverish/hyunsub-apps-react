import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MenuAppsView from 'src/components/common/menu/MenuAppsView';
import MenuProfileView from 'src/components/common/menu/MenuProfileView';
import { logoutAction } from 'src/redux/actions';

export default function MenuCommonSection() {
  const { t } = useTranslation();

  return (
    <div className="MenuCommonSection">
      <MenuProfileView />
      <hr />
      <MenuAppsView />
      <hr />
      <Button className="w-100" variant="outline-secondary" onClick={logoutAction()}>{t('logout')}</Button>
    </div>
  )
}
