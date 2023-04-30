import DriveRoutes from 'src/pages/drive/DriveRoutes';
import DesktopHeader, { DesktopHeaderProps } from 'src/components/common/header/DesktopHeader';
import { t } from 'i18next';

const desktopProps: DesktopHeaderProps = {
  title : 'Drive',
  menus: [
    {
      name: t('drive.menu.explorer'),
      link: DriveRoutes.explorer,
      icon: 'fas fa-folder',
    },
    {
      name: t('drive.menu.rename'),
      link: DriveRoutes.rename,
      icon: 'fas fa-edit',
    },
    {
      name: t('drive.menu.move'),
      link: DriveRoutes.move,
      icon: 'fas fa-exchange-alt',
    }
  ],
  dropdowns: [
    {
      name: t('menus'),
      link: DriveRoutes.explorer,
    }
  ],
  onSearch: () => {
    alert('Not yet implemented');
  },
  noContainer: true,
}

export default function DriveDesktopHeader() {
  return <DesktopHeader {...desktopProps} />
}
