import cs from 'classnames';
import { t } from 'i18next';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { apparelDeleteAction } from './ApparelDetailContext';
import ApparelImageCarousel from './components/ApparelImageCarousel';
import apparelDetailApi from 'src/api/apparel/apparel-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { HeaderButton } from 'src/model/component';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import router from 'src/pages/router';
import { useDispatch } from 'src/redux';
import { numberWithComma } from 'src/utils';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { setDocumentTitle } from 'src/utils/services';

import './ApparelDetailPage.scss';

export default function ApparelDetailPage() {
  const dispatch = useDispatch();
  const apparelId = useParams().apparelId!!;
  const title = t('apparel.page.detail.title');
  const isMobile = useBreakpointMobile();

  useEffect(() => {
    setDocumentTitle(title);
  }, [title]);

  const onDelete = () => {
    dispatch(apparelDeleteAction(apparelId));
  };

  const { info: apparel, images } = apparelDetailApi.useApi({ apparelId });
  const { discarded } = apparel;

  const mobileHeaderBtns: HeaderButton[] = [
    {
      icon: 'fas fa-edit',
      onClick: () => router.navigate(ApparelRoutes.update({ apparelId })),
    },
    {
      icon: 'fas fa-trash-alt',
      onClick: onDelete,
    },
  ];

  return (
    <div id="ApparelDetailPage">
      <MobileHeader title={title} back btns={mobileHeaderBtns} />
      <CommonContainer>
        <h1 className={cs({ discarded })}>{apparel.name}</h1>
        <div className="mt-3">
          <ApparelImageCarousel apparelId={apparelId} images={images} />
        </div>
        <div className="mt-0 row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.itemNo')}</div>
            <div>{apparel.itemNo}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.brand')}</div>
            <div>{apparel.brand}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.category')}</div>
            <div>{apparel.category}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.size')}</div>
            <div>{apparel.size}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.color')}</div>
            <div>{apparel.color}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.originPrice')}</div>
            <div>{apparel.originPrice ? numberWithComma(apparel.originPrice) : undefined}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.discountPrice')}</div>
            <div>{apparel.discountPrice ? numberWithComma(apparel.discountPrice) : undefined}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.buyDt')}</div>
            <div>{apparel.buyDt}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.buyLoc')}</div>
            <div>{apparel.buyLoc}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.makeDt')}</div>
            <div>{apparel.makeDt}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.material')}</div>
            <div>{apparel.material}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.size2')}</div>
            <div>{apparel.size2}</div>
          </div>
        </div>
        {isMobile || (
          <div className="mt-3">
            <Link to={ApparelRoutes.update({ apparelId })}>
              <Button>{t('edit')}</Button>
            </Link>
            <Button variant="danger" className="ms-2" onClick={onDelete}>
              {t('delete')}
            </Button>
          </div>
        )}
      </CommonContainer>
    </div>
  );
}
