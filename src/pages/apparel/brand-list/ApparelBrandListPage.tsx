import { t } from 'i18next';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import apparelBrandsApi from 'src/api/apparel/apparel-brands';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelBrandListPage() {
  const title = t('apparel.page.brand-list.title');
  setDocumentTitle(title);

  const isMobile = useBreakpointMobile();
  const brands = apparelBrandsApi.useApi({});

  const elements = brands.map((v) => (
    <ListGroup.Item key={v} as={Link} to={ApparelRoutes.brandDetail(v)}>
      {v}
    </ListGroup.Item>
  ));

  return (
    <div id="ApparelBrandListPage">
      <MobileHeader title={title} />
      <CommonContainer>
        {isMobile || <h1 className="mb-3">{title}</h1>}
        <ListGroup>{elements}</ListGroup>
      </CommonContainer>
    </div>
  );
}
