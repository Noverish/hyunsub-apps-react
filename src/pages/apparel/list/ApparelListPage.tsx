import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInfiniteApparel } from 'src/api/apparel/apparel-list';
import ApparelList from 'src/components/apparel/ApparelList';
import flatMap from 'lodash/flatMap';
import {Container, Spinner} from 'react-bootstrap';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
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
  }, [isFetching, fetchNextPage])

  const apparels = flatMap(data!!.pages.map(v => v.data));

  return (
    <div id="ApparelListPage">
      <ApparelHeader />
      <Container id="content">
        <ApparelList apparels={apparels} />
        {isFetching && <div className="flex_center" style={{ height: '8rem' }}>
        <Spinner animation="border"></Spinner>
      </div>}
      </Container>
    </div>
  )
}
