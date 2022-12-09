import flatMap from 'lodash/flatMap';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import apparelCategoryApparels from 'src/api/apparel/apparel-category-apparels';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import ApparelList from 'src/components/apparel/ApparelList';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import { useScrollBottom } from 'src/utils';

export default function ApparelCategoryDetailPage() {
  const category = useParams().category!!;
  const { t } = useTranslation();
  const title = t('apparel.page.category-detail.title', [category]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const { data, fetchNextPage, isFetching } = apparelCategoryApparels.useInfiniteApi({ category });

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  const apparels = flatMap(data!!.pages.map(v => v.data));

  return (
    <div id="ApparelCategoryDetailPage">
      <ApparelHeader title={title} back={true} />
      <Container id="content">
        <h1 className="mb-3">{t('apparel.page.category-detail.inner-title', [category, apparels.length])}</h1>
        <ApparelList apparels={apparels} />
        <ListLoadingIndicator isFetching={isFetching} />
      </Container>
    </div>
  )
}
