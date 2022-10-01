import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { Header, HeaderProps } from '../common/header/Header';

export default function ApparelHeader() {
  const props: HeaderProps = {
    title : 'HyunApparel',
    menus: [
      {
        name: 'All Apparels',
        link: ApparelRoutes.list,
        iconClass: 'fas fa-tshirt',
      },
      {
        name: 'Categories',
        link: ApparelRoutes.categoryList,
        iconClass: 'fas fa-th-large',
      },
      {
        name: 'Brands',
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
