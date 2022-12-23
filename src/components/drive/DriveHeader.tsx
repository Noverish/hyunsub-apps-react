import { useTranslation } from 'react-i18next';
import DriveRoutes from 'src/pages/drive/DriveRoutes';
import { usePath } from 'src/pages/drive/DriveHooks';
import { isMobile } from 'src/utils/user-agent';
import DesktopHeader, { DesktopHeaderProps } from '../common/header/DesktopHeader';
import MobileHeader, { MobileHeaderProps } from '../common/header/MobileHeader';

export default function DriveHeader(props: MobileHeaderProps) {
  const { t } = useTranslation();
  const [path] = usePath();
  const [path2] = usePath(2);

  const desktopProps: DesktopHeaderProps = {
    title : 'Drive',
    menus: [
      {
        name: t('drive.menu.explorer'),
        link: DriveRoutes.explorerRoute(path),
        icon: 'fas fa-folder',
      },
      {
        name: t('drive.menu.rename'),
        link: DriveRoutes.renameRoute(path),
        icon: 'fas fa-edit',
      },
      {
        name: t('drive.menu.move'),
        link: DriveRoutes.moveRoute(path, path2),
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

  if (isMobile()) {
    return <MobileHeader {...props} />
  } else {
    return <DesktopHeader {...desktopProps} />
  }
}
