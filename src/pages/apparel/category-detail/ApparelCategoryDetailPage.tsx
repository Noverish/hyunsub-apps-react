import { t } from 'i18next';

import ApparelCategoryDetailHooks from './ApparelCategoryDetailHooks';
import apparelCategoryApparelsApi from 'src/api/apparel/apparel-category-apparels';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import ApparelList from 'src/components/apparel/ApparelPreviewList';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import useScrollBottom from 'src/hooks/scroll-bottom';

export default function ApparelCategoryDetailPage() {
  const { category } = ApparelCategoryDetailHooks.usePageParams();

  const { data, fetchNextPage, isFetching } = apparelCategoryApparelsApi.useInfiniteApi(
    { category },
    { suspense: false },
  );
  const apparels = useFlattenPageData(data);
  const title = t('apparel.page.category-detail.title', [category, apparels.length]);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  return (
    <CommonLayout className="ApparelCategoryDetailPage" title={title} back>
      <ApparelList apparels={apparels} />
      <ListLoadingIndicator isFetching={isFetching} />
    </CommonLayout>
  );
}
