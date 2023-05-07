import { t } from 'i18next';

import apparelCategoryApparelsApi from 'src/api/apparel/apparel-category-apparels';
import ApparelList from 'src/components/apparel/ApparelList';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { useUrlParams } from 'src/hooks/url-params';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelCategoryDetailPage() {
  const [category] = useUrlParams('category');
  const isMobile = useBreakpointMobile();
  const { infiniteData: apparels, fetchNextPage, isFetching } = apparelCategoryApparelsApi.useInfiniteApi({ category });

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const title = t('apparel.page.category-detail.title', [category]);
  setDocumentTitle(title);

  return (
    <div id="ApparelCategoryDetailPage">
      <MobileHeader title={title} back />
      <CommonContainer>
        {isMobile || <h1 className="mb-3">{title}</h1>}
        <ApparelList apparels={apparels} />
        <ListLoadingIndicator isFetching={isFetching} />
      </CommonContainer>
    </div>
  );
}
