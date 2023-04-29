import { t } from 'i18next';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import CommonTabBar, { TabBarItem } from "../../common/header/CommonTabBar";

const items: TabBarItem[] = [
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
    name: t('add'),
    link: ApparelRoutes.add,
    icon: 'fas fa-plus',
  },
  {
    name: t('apparel.menu.brands'),
    link: ApparelRoutes.brandList,
    icon: 'fas fa-tag',
  },
]

export default function ApparelTabBar() {
  return (
    <CommonTabBar items={items} />
  )
}
