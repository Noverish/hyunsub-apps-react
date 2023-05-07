import { t } from 'i18next';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { apparelDeleteAction } from './ApparelDetailContext';
import apparelDetailApi from 'src/api/apparel/apparel-detail';
import ImageCarousel from 'src/components/common/ImageCarousel';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { useDispatch } from 'src/redux';
import { numberWithComma } from 'src/utils';
import { setDocumentTitle } from 'src/utils/services';

export default function ApparelDetailPage() {
  const dispatch = useDispatch();
  const apparelId = useParams().apparelId!!;
  const title = t('apparel.page.detail.title');

  useEffect(() => {
    setDocumentTitle(title);
  }, [title]);

  const onDelete = () => {
    dispatch(apparelDeleteAction(apparelId));
  };

  const apparel = apparelDetailApi.useApi({ apparelId });
  const urls = apparel.images.map((v) => v.url + '?size=512');

  return (
    <div id="ApparelDetailPage">
      <MobileHeader title={title} back />
      <CommonContainer>
        <h1>{apparel.name}</h1>
        <div className="mt-3">
          <ImageCarousel urls={urls} />
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
            <div className="fw-bold fs-5">{t('apparel.term.material')}</div>
            <div>{apparel.material}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.size2')}</div>
            <div>{apparel.size2}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.makeDt')}</div>
            <div>{apparel.makeDt}</div>
          </div>
        </div>
        <div className="mt-3">
          <Link to={ApparelRoutes.edit(apparelId)}>
            <Button>{t('edit')}</Button>
          </Link>
          <Button variant="danger" className="ms-2" onClick={onDelete}>
            {t('delete')}
          </Button>
        </div>
      </CommonContainer>
    </div>
  );
}
