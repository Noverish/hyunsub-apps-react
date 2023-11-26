import { t } from 'i18next';

import apparelBrandApparelsApi from 'src/api/apparel/apparel-brand-apparels';
import { useFlattenPageData } from 'src/api/generate-infinite-query';
import ApparelList from 'src/components/apparel/ApparelList';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import useScrollBottom from 'src/hooks/scroll-bottom';
import { useUrlParams } from 'src/hooks/url-params';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelBrandDetailPage() {
  const [brand] = useUrlParams('brand');
  const isMobile = useBreakpointMobile();
  const { data, fetchNextPage, isFetching } = apparelBrandApparelsApi.useInfiniteApi({ brand });
  const apparels = useFlattenPageData(data);

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const title = t('apparel.page.brand-detail.title', [brand, apparels.length]);
  setDocumentTitle(title);

  return (
    <div id="ApparelBrandDetailPage">
      <MobileHeader title={title} back />
      <CommonContainer>
        {isMobile || <h1 className="mb-3">{title}</h1>}
        <ApparelList apparels={apparels} />
        <ListLoadingIndicator isFetching={isFetching} />
      </CommonContainer>
    </div>
  );
}
