import { t } from 'i18next';

import CommonNavigation from 'src/components/common/navigation/CommonNavigation';
import { CommonNavigationProps } from 'src/model/component';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';

const props: CommonNavigationProps = {
  title: 'HyunApparel',
  menus: [
    {
      name: t('ApparelNavigation.all-apparels'),
      link: ApparelRoutes.list,
      icon: 'fas fa-tshirt',
    },
    {
      name: t('ApparelNavigation.categories'),
      link: ApparelRoutes.categoryList,
      icon: 'fas fa-th-large',
    },
    {
      name: t('ApparelNavigation.brands'),
      link: ApparelRoutes.brandList,
      icon: 'fas fa-tag',
    },
  ],
};

export default function ApparelNavigation() {
  return <CommonNavigation {...props} />;
}
