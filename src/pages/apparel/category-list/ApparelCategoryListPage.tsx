import { t } from 'i18next';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apparelCategoriesApi from 'src/api/apparel/apparel-categories';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelCategoryListPage() {
  const title = t('apparel.page.category-list.title');
  setDocumentTitle(title);

  const isMobile = useBreakpointMobile();
  const categories = apparelCategoriesApi.useApi({});

  const elements = categories.map(v => (
    <ListGroup.Item key={v} as={Link} to={ApparelRoutes.categoryDetail(v)}>
      {v}
    </ListGroup.Item>
  ))

  return (
    <div id="ApparelCategoryListPage">
      <MobileHeader title={title} />
      <CommonContainer>
        {isMobile || <h1 className="mb-3">{title}</h1>}
        <ListGroup>
          {elements}
        </ListGroup>
      </CommonContainer>
    </div>
  )
}
