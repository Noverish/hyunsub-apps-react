import { t } from 'i18next';
import { Navigate } from 'react-router-dom';

import ApparelUpdateHooks from './ApparelUpdateHooks';
import apparelDetailApi from 'src/api/apparel/apparel-detail';
import ApparelForm from 'src/components/apparel/form/ApparelForm';
import { Loading } from 'src/components/common/LoadingSuspense';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import CommonRoutes from 'src/pages/common/CommonRoutes';

export default function ApparelUpdatePage() {
  const { apparelId } = ApparelUpdateHooks.usePageParams();
  const { data, isLoading } = apparelDetailApi.useApiResult({ apparelId });
  const update = ApparelUpdateHooks.useUpdate();

  const title = t('apparel.page.edit.title', [data?.info?.name ?? '']);

  let content = <></>;
  if (isLoading) {
    content = <Loading />;
  } else if (data) {
    content = <ApparelForm onComplete={update} apparel={data} />;
  } else {
    content = <Navigate to={CommonRoutes.notFound} replace />;
  }

  return (
    <CommonLayout className="ApparelUpdatePage" title={title} back>
      {content}
    </CommonLayout>
  );
}
