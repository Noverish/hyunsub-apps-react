import { t } from 'i18next';

import CommonNavigation from 'src/components/common/navigation/CommonNavigation';
import { useUrlParams } from 'src/hooks/url-params';
import { NavigationProps } from 'src/model/component';
import DutchRoutes from 'src/pages/dutch/DutchRoutes';

export default function DutchNavigation() {
  const [tripId] = useUrlParams('tripId');

  const props: NavigationProps = {
    title: 'HyunDutch',
    menus: [
      {
        name: t('DutchNavigation.home'),
        link: DutchRoutes.home({ tripId }),
        icon: 'fas fa-home',
      },
      {
        name: t('DutchNavigation.records'),
        link: DutchRoutes.recordList({ tripId }),
        icon: 'fas fa-list',
      },
      {
        name: t('DutchNavigation.settle'),
        link: DutchRoutes.settle({ tripId }),
        icon: 'fas fa-receipt',
      },
      {
        name: t('DutchNavigation.balance'),
        link: DutchRoutes.spend({ tripId }),
        icon: 'fas fa-user-circle',
      },
    ],
    disableSearch: true,
    disableMenu: true,
  };

  return <CommonNavigation {...props} />;
}
