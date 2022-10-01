import flatMap from 'lodash/flatMap';
import { useEffect } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import apparelList from 'src/api/apparel/apparel-list';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import ApparelList from 'src/components/apparel/ApparelList';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { useScrollBottom } from 'src/utils';

export default function ApparelListPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('apparel.page.list.title');
  }, [t]);

  const { data, fetchNextPage, isFetching } = apparelList.useInfiniteApi({});

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
        <h1 className="mb-3">{t('apparel.page.list.inner-title', [data?.pages[0].total])}</h1>
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
