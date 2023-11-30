import { t } from 'i18next';
import { Button } from 'react-bootstrap';

import CommonLayout from 'src/components/common/layout/CommonLayout';
import useLogout from 'src/hooks/logout';
import MenuAppsView from 'src/pages/common/menu/components/MenuAppsView';
import MenuProfileView from 'src/pages/common/menu/components/MenuProfileView';

interface Props {
  children?: React.ReactNode;
}

export default function CommonMenuPage({ children }: Props) {
  const logout = useLogout(true);

  return (
    <CommonLayout className="CommonMenuPage" title={t('CommonNavigation.menu')}>
      <MenuProfileView />
      <hr />
      <MenuAppsView />
      <hr />
      {children}
      <Button className="w-100 mt-3" variant="outline-secondary" onClick={logout}>
        {t('logout')}
      </Button>
    </CommonLayout>
  );
}
