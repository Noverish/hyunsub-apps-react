import { t } from 'i18next';

import DesktopHeader, { DesktopHeaderProps } from 'src/components/common/header/DesktopHeader';
import DriveRoutes from 'src/pages/drive/DriveRoutes';

const desktopProps: DesktopHeaderProps = {
  title: 'HyunDrive',
  menus: [
    {
      name: t('drive.menu.explorer'),
      link: DriveRoutes.explorerRoute,
      icon: 'fas fa-folder',
    },
  ],
  dropdowns: [],
  onSearch: () => {
    alert('Not yet implemented');
  },
};

export default function DriveDesktopHeader() {
  return <DesktopHeader {...desktopProps} />;
}
