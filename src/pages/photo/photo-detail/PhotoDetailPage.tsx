import { t } from 'i18next';
import { Navigate } from 'react-router-dom';

import PhotoDetailHooks from './PhotoDetailHooks';
import PhotoDetailView from './components/PhotoDetailView';
import photoDetailApi from 'src/api/photo/photo-detail';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { Photo } from 'src/model/photo';
import CommonRoutes from 'src/pages/common/CommonRoutes';

export default function PhotoDetailPage() {
  const { photoId } = PhotoDetailHooks.usePageParams();

  const { data, isLoading } = photoDetailApi.useApiResult({ photoId });

  const content = PhotoDetailPageContent(isLoading, data);

  return (
    <CommonLayout className="PhotoDetailPage" title={t('PhotoDetailPage.title')} back>
      {content}
    </CommonLayout>
  );
}

function PhotoDetailPageContent(isLoading: boolean, data?: Photo): React.ReactNode {
  if (isLoading) {
    return <></>;
  }

  if (!data) {
    return <Navigate to={CommonRoutes.notFound} replace />;
  }

  return <PhotoDetailView photo={data} />;
}
