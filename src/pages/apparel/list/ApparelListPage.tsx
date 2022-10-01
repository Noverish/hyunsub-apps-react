import flatMap from 'lodash/flatMap';
import { useEffect } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useInfiniteApparel } from 'src/api/apparel/apparel-list';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import ApparelList from 'src/components/apparel/ApparelList';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { useScrollBottom } from 'src/utils';

export default function ApparelListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('apparel.page.list.title');
  }, [t]);

  const { data, fetchNextPage, isFetching } = useInfiniteApparel({ page: 0 });

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  const apparels = flatMap(data!!.pages.map(v => v.data));

  return (
    <div id="ApparelListPage">
      <ApparelHeader />
      <Container id="content">
        <div className="mb-3">
          <Link to={ApparelRoutes.add}><Button variant="primary">{t('add')}</Button></Link>
        </div>
        <ApparelList apparels={apparels} />
        {isFetching && <div className="flex_center" style={{ height: '8rem' }}>
          <Spinner animation="border"></Spinner>
        </div>}
      </Container>
    </div>
  )
}
