import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import apparelBrands from 'src/api/apparel/apparel-brands';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelBrandListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    setDocumentTitle(t('apparel.page.brand-list.title'));
  }, [t]);

  const brands = apparelBrands.useApi({});

  const elements = brands.map(v => (
    <ListGroup.Item key={v} as={Link} to={ApparelRoutes.brandDetailRoute(v)}>
      {v}
    </ListGroup.Item>
  ))

  return (
    <div id="ApparelBrandListPage">
      <MobileHeader title={t('apparel.menu.brands')} />
      <CommonContainer>
        <h1 className="mb-3">{t('apparel.page.brand-list.title')}</h1>
        <ListGroup>
          {elements}
        </ListGroup>
      </CommonContainer>
    </div>
  )
}
