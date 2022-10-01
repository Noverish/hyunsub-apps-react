import { useEffect } from 'react';
import {Container, Spinner} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useInfiniteApparelCategoryApparels } from 'src/api/apparel/apparel-category-apparels';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import {useScrollBottom} from 'src/utils';
import flatMap from 'lodash/flatMap';
import ApparelList from 'src/components/apparel/ApparelList';

export default function ApparelCategoryDetailPage() {
  const category = useParams().category!!;
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('apparel.page.category-detail.title', [category]);
  }, [t, category]);

  const { data, fetchNextPage, isFetching } = useInfiniteApparelCategoryApparels({ page: 0, category });

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  const apparels = flatMap(data!!.pages.map(v => v.data));

  // TODO Spinner 컴포넌트 하나 만들기
  return (
    <div id="ApparelCategoryDetailPage">
      <ApparelHeader />
      <Container id="content">
        <h1 className="mb-3">{t('apparel.page.category-detail.inner-title', [category, apparels.length])}</h1>
        <ApparelList apparels={apparels} />
        {isFetching && <div className="flex_center" style={{ height: '8rem' }}>
          <Spinner animation="border"></Spinner>
        </div>}
      </Container>
    </div>
  )
}
