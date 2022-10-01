import { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import apparelDetail from 'src/api/apparel/apparel-detail';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import { Link, useParams } from 'react-router-dom';
import ImageSwiper from 'src/components/common/ImageSwiper';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import { numberWithComma } from 'src/utils';
import { useDispatch } from 'src/redux';
import { apparelDeleteAction } from './ApparelDetailContext';

export default function ApparelDetailPage() {
  const dispatch = useDispatch();
  const apparelId = useParams().apparelId!!;
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('apparel.page.detail.title');
  }, [t]);

  const onDelete = () => {
    dispatch(apparelDeleteAction(apparelId));
  }

  const apparel = apparelDetail.useApi({ apparelId });
  const urls = apparel.images.map(v => v.url + '?size=512');

  return (
    <div id="ApparelDetailPage">
      <ApparelHeader />
      <Container id="content">
        <h1>{apparel.name}</h1>
        <div className="mt-3">
          <ImageSwiper urls={urls} />
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
            <div>{(apparel.originPrice) ? numberWithComma(apparel.originPrice) : undefined}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.discountPrice')}</div>
            <div>{(apparel.discountPrice) ? numberWithComma(apparel.discountPrice) : undefined}</div>
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
          <Link to={ApparelRoutes.editRoute(apparelId)}><Button>수정하기</Button></Link>
          <Button variant="danger" className="ms-2" onClick={onDelete}>삭제하기</Button>
        </div>
      </Container>
    </div>
  )
}
