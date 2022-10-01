import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import { Container, ListGroup } from 'react-bootstrap';
import apparelCategories from 'src/api/apparel/apparel-categories';
import { Link } from 'react-router-dom';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';

export default function ApparelCategoryListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('apparel.page.category-list.title');
  }, [t]);

  const categories = apparelCategories.useApi();

  const elements = categories.map(v => (
    <ListGroup.Item action key={v}>
      <Link to={ApparelRoutes.categoryDetailRoute(v)}>
        {v}
      </Link>
    </ListGroup.Item>
  ))

  return (
    <div id="ApparelCategoryListPage">
      <ApparelHeader />
      <Container id="content">
        <h1>{t('apparel.page.category-list.title')}</h1>
        <ListGroup>
          {elements}
        </ListGroup>
      </Container>
    </div>
  )
}
