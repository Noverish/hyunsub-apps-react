import DriveRoutes from 'src/pages/drive/DriveRoutes';
import DesktopHeader, { DesktopHeaderProps } from 'src/components/common/header/DesktopHeader';
import { t } from 'i18next';

const desktopProps: DesktopHeaderProps = {
  title : 'HyunDrive',
  menus: [
    {
      name: t('drive.menu.explorer'),
      link: DriveRoutes.explorerRoute,
      icon: 'fas fa-folder',
    },
  ],
  dropdowns: [
    {
      name: t('menus'),
      link: DriveRoutes.explorerRoute,
    }
  ],
  onSearch: () => {
    alert('Not yet implemented');
  },
}

export default function DriveDesktopHeader() {
  return <DesktopHeader {...desktopProps} />
}
