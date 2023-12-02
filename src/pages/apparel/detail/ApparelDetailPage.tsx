import cs from 'classnames';
import { t } from 'i18next';

import ApparelDetailHooks from './ApparelDetailHooks';
import ApparelDetailView from './components/ApparelDetailView';
import ApparelImageCarousel from './components/ApparelImageCarousel';
import apparelDetailApi from 'src/api/apparel/apparel-detail';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { HeaderButton } from 'src/model/component';
import ApparelRoutes from 'src/pages/apparel/ApparelRoutes';
import router from 'src/pages/router';

import './ApparelDetailPage.scss';

export default function ApparelDetailPage() {
  const { apparelId } = ApparelDetailHooks.usePageParams();
  const onDelete = ApparelDetailHooks.useDelete();

  const { data } = apparelDetailApi.useApiResult({ apparelId });
  const info = data?.info;
  const name = info?.name ?? '';
  const discarded = info?.discarded ?? false;
  const images = data?.images ?? [];

  const btns: HeaderButton[] = [
    {
      icon: 'fas fa-edit',
      name: t('edit'),
      onClick: () => router.navigate(ApparelRoutes.update({ apparelId })),
    },
    {
      icon: 'fas fa-trash-alt',
      name: t('delete'),
      onClick: onDelete,
    },
  ];

  return (
    <CommonLayout className="ApparelDetailPage" title={t('apparel.page.detail.title')} back btns={btns}>
      <h1 className={cs({ discarded })}>{name}</h1>
      <div className="mt-3">
        <ApparelImageCarousel apparelId={apparelId} images={images} />
      </div>
      {info ? <ApparelDetailView info={info} /> : <Loading />}
    </CommonLayout>
  );
}
