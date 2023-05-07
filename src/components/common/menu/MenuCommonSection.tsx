import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import MenuAppsView from 'src/components/common/menu/MenuAppsView';
import MenuProfileView from 'src/components/common/menu/MenuProfileView';
import useLogout from 'src/hooks/logout';

export default function MenuCommonSection() {
  const { t } = useTranslation();

  const logout = useLogout(true);

  return (
    <div className="MenuCommonSection">
      <MenuProfileView />
      <hr />
      <MenuAppsView />
      <hr />
      <Button className="w-100" variant="outline-secondary" onClick={logout}>
        {t('logout')}
      </Button>
    </div>
  );
}
