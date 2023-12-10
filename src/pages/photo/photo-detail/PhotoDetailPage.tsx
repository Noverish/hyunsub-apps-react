import { t } from 'i18next';
import { Navigate } from 'react-router-dom';

import { PhotoDetailProvider } from './PhotoDetailContext';
import PhotoDetailHooks from './PhotoDetailHooks';
import PhotoDateModal from './components/PhotoDateModal';
import PhotoDetailView from './components/PhotoDetailView';
import photoDetailApi from 'src/api/photo/photo-detail';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { Photo } from 'src/model/photo';
import CommonRoutes from 'src/pages/common/CommonRoutes';

function PhotoDetailPage() {
  const { photoId } = PhotoDetailHooks.usePageParams();

  const { data, isLoading } = photoDetailApi.useApiResult({ photoId });

  const content = renderContent(isLoading, data);

  return (
    <CommonLayout className="PhotoDetailPage" title={t('PhotoDetailPage.title')} back>
      {content}
    </CommonLayout>
  );
}

function renderContent(isLoading: boolean, data?: Photo): React.ReactNode {
  if (isLoading) {
    return <></>;
  }

  if (!data) {
    return <Navigate to={CommonRoutes.notFound} replace />;
  }

  return (
    <>
      <PhotoDetailView photo={data} />
      <PhotoDateModal photo={data} />
    </>
  );
}

export default function PhotoDetailIndex() {
  return (
    <PhotoDetailProvider>
      <PhotoDetailPage />
    </PhotoDetailProvider>
  );
}
