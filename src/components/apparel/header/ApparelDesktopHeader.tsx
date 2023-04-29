import { t } from 'i18next';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import DesktopHeader, { DesktopHeaderProps } from '../../common/header/DesktopHeader';

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
    }
  ],
  dropdowns: [
    {
      name: t('menus'),
      link: ApparelRoutes.menu,
    }
  ],
  onSearch: () => {
    alert('Not yet implemented');
  },
}

export default function ApparelDesktopHeader() {
  return <DesktopHeader {...desktopProps} />
}
