import flatMap from 'lodash/flatMap';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import apparelBrandApparels from 'src/api/apparel/apparel-brand-apparels';
import ApparelList from 'src/components/apparel/ApparelList';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelBrandDetailPage() {
  const brand = useParams().brand!!;
  const { t } = useTranslation();
  const title = t('apparel.page.brand-detail.title', [brand]);

  useEffect(() => {
    setDocumentTitle(title);
  }, [title]);

  const { data, fetchNextPage, isFetching } = apparelBrandApparels.useInfiniteApi({ brand });

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const apparels = flatMap(data!!.pages.map(v => v.data));

  return (
    <div id="ApparelBrandDetailPage">
      <MobileHeader title={title} back />
      <CommonContainer>
        <h1 className="mb-3">{t('apparel.page.brand-detail.inner-title', [brand, apparels.length])}</h1>
        <ApparelList apparels={apparels} />
        <ListLoadingIndicator isFetching={isFetching} />
      </CommonContainer>
    </div>
  )
}
