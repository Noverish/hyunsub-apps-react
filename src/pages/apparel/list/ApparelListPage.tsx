import { t } from 'i18next';

import apparelListApi from 'src/api/apparel/apparel-list';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import ApparelList from 'src/components/apparel/ApparelPreviewList';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { HeaderButton } from 'src/model/component';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import router from 'src/pages/router';

export default function ApparelListPage() {
  const { data, fetchNextPage, isFetching } = apparelListApi.useInfiniteApi({}, { suspense: false });
  const apparels = useFlattenPageData(data);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const headerBtns: HeaderButton[] = [
    {
      icon: 'fas fa-plus',
      name: t('add'),
      onClick: () => router.navigate(ApparelRoutes.create),
    },
  ];

  return (
    <CommonLayout className="ApparelListPage" title={t('apparel.page.list.title')} btns={headerBtns}>
      <h2 className="mb-2">{t('apparel.page.list.inner-title', [data?.pages[0].total ?? 0])}</h2>
      <ApparelList apparels={apparels} />
      <ListLoadingIndicator isFetching={isFetching} />
    </CommonLayout>
  );
}
