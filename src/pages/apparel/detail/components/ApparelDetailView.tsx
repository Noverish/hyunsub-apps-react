import { t } from 'i18next';

import { ApparelInfo } from 'src/model/apparel';
import { numberWithComma } from 'src/utils';

interface Props {
  info: ApparelInfo;
}

export default function ApparelDetailView({ info: apparel }: Props) {
  return (
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
  );
}
