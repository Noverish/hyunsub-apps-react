import flatMap from 'lodash/flatMap';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import apparelCategoryApparels from 'src/api/apparel/apparel-category-apparels';
import ApparelList from 'src/components/apparel/ApparelList';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelCategoryDetailPage() {
  const category = useParams().category!!;
  const { t } = useTranslation();
  const title = t('apparel.page.category-detail.title', [category]);

  useEffect(() => {
    setDocumentTitle(title);
  }, [title]);

  const { data, fetchNextPage, isFetching } = apparelCategoryApparels.useInfiniteApi({ category });

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const apparels = flatMap(data!!.pages.map(v => v.data));

  return (
    <div id="ApparelCategoryDetailPage">
      <MobileHeader title={title} back={true} />
      <CommonContainer>
        <h1 className="mb-3">{t('apparel.page.category-detail.inner-title', [category, apparels.length])}</h1>
        <ApparelList apparels={apparels} />
        <ListLoadingIndicator isFetching={isFetching} />
      </CommonContainer>
    </div>
  )
}
