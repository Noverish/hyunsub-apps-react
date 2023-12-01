import { t } from 'i18next';

import CommonNavigation from 'src/components/common/navigation/CommonNavigation';
import { NavigationProps } from 'src/model/component';
import DriveRoutes from 'src/pages/drive/DriveRoutes';

const props: NavigationProps = {
  title: 'HyunDrive',
  menus: [
    {
      name: t('DriveNavigation'),
      link: DriveRoutes.explorerRoute,
      icon: 'fas fa-folder',
    },
  ],
};

export default function DriveNavigation() {
  return <CommonNavigation {...props} />;
}
