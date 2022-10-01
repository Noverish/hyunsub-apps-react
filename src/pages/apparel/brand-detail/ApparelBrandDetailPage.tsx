import { useEffect } from 'react';
import {Container, Spinner} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useInfiniteApparelBrandApparels } from 'src/api/apparel/apparel-brand-apparels';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import {useScrollBottom} from 'src/utils';
import flatMap from 'lodash/flatMap';
import ApparelList from 'src/components/apparel/ApparelList';

export default function ApparelBrandDetailPage() {
  const brand = useParams().brand!!;
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('apparel.page.brand-detail.title', [brand]);
  }, [t, brand]);

  const { data, fetchNextPage, isFetching } = useInfiniteApparelBrandApparels({ page: 0, brand });

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  const apparels = flatMap(data!!.pages.map(v => v.data));

  return (
    <div id="ApparelBrandDetailPage">
      <ApparelHeader />
      <Container id="content">
        <h1 className="mb-3">{t('apparel.page.brand-detail.inner-title', [brand, apparels.length])}</h1>
        <ApparelList apparels={apparels} />
        {isFetching && <div className="flex_center" style={{ height: '8rem' }}>
          <Spinner animation="border"></Spinner>
        </div>}
      </Container>
    </div>
  )
}
