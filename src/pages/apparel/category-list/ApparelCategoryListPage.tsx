import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import apparelCategories from 'src/api/apparel/apparel-categories';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import CommonContainer from 'src/components/common/header/CommonContainer';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';

export default function ApparelCategoryListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('apparel.page.category-list.title');
  }, [t]);

  const categories = apparelCategories.useApi({});

  const elements = categories.map(v => (
    <ListGroup.Item key={v} as={Link} to={ApparelRoutes.categoryDetailRoute(v)}>
      {v}
    </ListGroup.Item>
  ))

  return (
    <div id="ApparelCategoryListPage">
      <ApparelHeader title={t('apparel.menu.categories')} />
      <CommonContainer>
        <h1 className="mb-3">{t('apparel.page.category-list.title')}</h1>
        <ListGroup>
          {elements}
        </ListGroup>
      </CommonContainer>
    </div>
  )
}
