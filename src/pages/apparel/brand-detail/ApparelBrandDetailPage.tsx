import flatMap from 'lodash/flatMap';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import apparelBrandApparels from 'src/api/apparel/apparel-brand-apparels';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import ApparelList from 'src/components/apparel/ApparelList';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import { useScrollBottom } from 'src/utils';

export default function ApparelBrandDetailPage() {
  const brand = useParams().brand!!;
  const { t } = useTranslation();
  const title = t('apparel.page.brand-detail.title', [brand]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const { data, fetchNextPage, isFetching } = apparelBrandApparels.useInfiniteApi({ brand });

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  const apparels = flatMap(data!!.pages.map(v => v.data));

  return (
    <div id="ApparelBrandDetailPage">
      <ApparelHeader title={title} back={true} />
      <Container id="content">
        <h1 className="mb-3">{t('apparel.page.brand-detail.inner-title', [brand, apparels.length])}</h1>
        <ApparelList apparels={apparels} />
        <ListLoadingIndicator isFetching={isFetching} />
      </Container>
    </div>
  )
}
