import { t } from 'i18next';

import CommonNavigation from 'src/components/common/navigation/CommonNavigation';
import { CommonNavigationProps } from 'src/model/component';
import DriveRoutes from 'src/pages/drive/DriveRoutes';

const props: CommonNavigationProps = {
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
