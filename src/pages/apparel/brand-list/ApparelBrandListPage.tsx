import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import { Container, ListGroup } from 'react-bootstrap';
import apparelBrands from 'src/api/apparel/apparel-brands';
import { Link } from 'react-router-dom';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';

export default function ApparelBrandListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('apparel.page.brand-list.title');
  }, [t]);

  const brands = apparelBrands.useApi();

  const elements = brands.map(v => (
    <ListGroup.Item key={v} as={Link} to={ApparelRoutes.brandDetailRoute(v)}>
      {v}
    </ListGroup.Item>
  ))

  return (
    <div id="ApparelBrandListPage">
      <ApparelHeader />
      <Container id="content">
        <h1 className="mb-3">{t('apparel.page.brand-list.title')}</h1>
        <ListGroup>
          {elements}
        </ListGroup>
      </Container>
    </div>
  )
}
