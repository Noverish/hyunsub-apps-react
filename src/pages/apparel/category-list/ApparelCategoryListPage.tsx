import { t } from 'i18next';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import apparelCategoriesApi from 'src/api/apparel/apparel-categories';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';

export default function ApparelCategoryListPage() {
  const { data, isLoading } = apparelCategoriesApi.useApiResult({});

  const elements = (data ?? []).map((v) => (
    <ListGroup.Item key={v} as={Link} to={ApparelRoutes.categoryDetail(v)}>
      {v}
    </ListGroup.Item>
  ));

  return (
    <CommonLayout className="ApparelCategoryListPage" title={t('apparel.page.category-list.title')}>
      {isLoading ? <Loading /> : <ListGroup>{elements}</ListGroup>}
    </CommonLayout>
  );
}
