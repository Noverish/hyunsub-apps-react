import { t } from 'i18next';

import DesktopHeader, { DesktopHeaderProps } from '../../common/header/DesktopHeader';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';

const desktopProps: DesktopHeaderProps = {
  title: 'HyunApparel',
  menus: [
    {
      name: t('apparel.menu.all-apparels'),
      link: ApparelRoutes.list,
      icon: 'fas fa-tshirt',
    },
    {
      name: t('apparel.menu.categories'),
      link: ApparelRoutes.categoryList,
      icon: 'fas fa-th-large',
    },
    {
      name: t('apparel.menu.brands'),
      link: ApparelRoutes.brandList,
      icon: 'fas fa-tag',
    },
  ],
  dropdowns: [],
  onSearch: () => {
    alert('Not yet implemented');
  },
};

export default function ApparelDesktopHeader() {
  return <DesktopHeader {...desktopProps} />;
}
