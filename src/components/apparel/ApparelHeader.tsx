import { useTranslation } from 'react-i18next';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { Header, HeaderProps } from '../common/header/Header';

export default function ApparelHeader() {
  const { t } = useTranslation();

  const props: HeaderProps = {
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
        name: 'Setting',
        link: ApparelRoutes.setting,
      }
    ],
    onSearch: () => {
      alert('Not yet implemented');
    },
  }

  return (
    <Header {...props} />
  )
}
