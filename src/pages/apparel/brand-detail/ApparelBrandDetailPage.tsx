import { t } from 'i18next';

import ApparelBrandDetailHooks from './ApparelBrandDetailHooks';
import apparelBrandApparelsApi from 'src/api/apparel/apparel-brand-apparels';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import ApparelList from 'src/components/apparel/ApparelPreviewList';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import useScrollBottom from 'src/hooks/scroll-bottom';

export default function ApparelBrandDetailPage() {
  const { brand } = ApparelBrandDetailHooks.usePageParams();

  const { data, fetchNextPage, isFetching } = apparelBrandApparelsApi.useInfiniteApi({ brand }, { suspense: false });
  const apparels = useFlattenPageData(data);
  const title = t('apparel.page.brand-detail.title', [brand, apparels.length]);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  return (
    <CommonLayout className="ApparelBrandDetailPage" title={title} back>
      <ApparelList apparels={apparels} />
      <ListLoadingIndicator isFetching={isFetching} />
    </CommonLayout>
  );
}
