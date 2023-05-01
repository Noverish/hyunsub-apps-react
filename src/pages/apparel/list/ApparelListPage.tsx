import { t } from 'i18next';
import flatMap from 'lodash/flatMap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apparelList from 'src/api/apparel/apparel-list';
import ApparelList from 'src/components/apparel/ApparelList';
import ListLoadingIndicator from 'src/components/common/ListLoadingIndicator';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader, { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import useScrollBottom from 'src/hooks/scroll-bottom';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import router from 'src/pages/router';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelListPage() {
  setDocumentTitle(t('apparel.page.list.title'));

  const isMobile = useBreakpointMobile();
  const { data, fetchNextPage, isFetching } = apparelList.useInfiniteApi({});

  useScrollBottom(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  const apparels = flatMap(data!!.pages.map(v => v.data));

  const addBtn = isMobile
    ? undefined
    : <Link to={ApparelRoutes.add}><Button variant="primary" className="mb-3">{t('add')}</Button></Link>

  const headerBtns: MobileHeaderButton[] = [
    {
      icon: 'fas fa-plus',
      onClick: () => router.navigate(ApparelRoutes.add),
    }
  ]

  return (
    <div id="ApparelListPage">
      <MobileHeader title={t('apparel.menu.all-apparels')} btns={headerBtns} />
      <CommonContainer>
        <h2 className="mb-2">{t('apparel.page.list.inner-title', [data?.pages[0].total])}</h2>
        {addBtn}
        <ApparelList apparels={apparels} />
        <ListLoadingIndicator isFetching={isFetching} />
      </CommonContainer>
    </div>
  )
}
