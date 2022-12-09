import { useTranslation } from 'react-i18next';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { isMobile } from 'src/utils/user-agent';
import DesktopHeader, { DesktopHeaderProps } from '../common/header/DesktopHeader';
import MobileHeader, { MobileHeaderProps } from '../common/header/MobileHeader';

export default function ApparelHeader(props: MobileHeaderProps) {
  const { t } = useTranslation();

  const desktopProps: DesktopHeaderProps = {
    title : 'HyunApparel',
    menus: [
      {
        name: t('apparel.menu.all-apparels'),
        link: ApparelRoutes.list,
        iconClass: 'fas fa-tshirt',
      },
      {
        name: t('apparel.menu.categories'),
        link: ApparelRoutes.categoryList,
        iconClass: 'fas fa-th-large',
      },
      {
        name: t('apparel.menu.brands'),
        link: ApparelRoutes.brandList,
        iconClass: 'fas fa-tag',
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

  if (isMobile()) {
    return <MobileHeader {...props} />
  } else {
    return <DesktopHeader {...desktopProps} />
  }
}
