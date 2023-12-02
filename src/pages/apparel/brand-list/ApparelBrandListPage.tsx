import { t } from 'i18next';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import apparelBrandsApi from 'src/api/apparel/apparel-brands';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';

export default function ApparelBrandListPage() {
  const { data, isLoading } = apparelBrandsApi.useApiResult({});

  const elements = (data ?? []).map((v) => (
    <ListGroup.Item key={v} as={Link} to={ApparelRoutes.brandDetail(v)}>
      {v}
    </ListGroup.Item>
  ));

  return (
    <CommonLayout className="ApparelBrandListPage" title={t('apparel.page.brand-list.title')}>
      {isLoading ? <Loading /> : <ListGroup>{elements}</ListGroup>}
    </CommonLayout>
  );
}
