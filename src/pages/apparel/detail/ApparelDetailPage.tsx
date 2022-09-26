import { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import apparelDetail from 'src/api/apparel/apparel-detail';
import ApparelHeader from 'src/components/apparel/ApparelHeader';
import { Link, useParams } from 'react-router-dom';
import ImageSwiper from 'src/components/common/ImageSwiper';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';

export default function ApparelDetailPage() {
  const apparelId = useParams().apparelId!!;
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('apparel.page.detail.title');
  }, [t]);

  const apparel = apparelDetail.useApi({ apparelId });
  const urls = apparel.images.map(v => v.url);

  return (
    <div id="ApparelDetailPage">
      <ApparelHeader />
      <Container id="content">
        <h1>{apparel.name}</h1>
        <div className="mt-3" style={{ height: '480px' }}>
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
            <div className="fw-bold fs-5">{t('apparel.term.type')}</div>
            <div>{apparel.type}</div>
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
            <div>{apparel.originPrice}</div>
          </div>
          <div className="col">
            <div className="fw-bold fs-5">{t('apparel.term.discountPrice')}</div>
            <div>{apparel.discountPrice}</div>
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
        <Link to={ApparelRoutes.editRoute(apparelId)}><Button className="mt-3">수정하기</Button></Link>
      </Container>
    </div>
  )
}
