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
        name: t('DutchNavigation.balance'),
        link: DutchRoutes.balanceRoute,
        icon: 'fas fa-wallet',
      },
      {
        name: t('DutchNavigation.settle'),
        link: DutchRoutes.settleRoute,
        icon: 'fas fa-receipt',
      },
    ],
    disableSearch: true,
    disableMenu: true,
  };

  return <CommonNavigation {...props} />;
}
