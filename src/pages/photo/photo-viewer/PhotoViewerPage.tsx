import { t } from 'i18next';
import { useContext } from 'react';

import { PhotoViewerContext, PhotoViewerProvider } from './PhotoViewerContext';
import PhotoViewerHooks from './PhotoViewerHooks';
import PhotoInfoSection from 'src/components/photo/PhotoInfoSection';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import { setDocumentTitle } from 'src/utils/services';

function PhotoViewerPage() {
  setDocumentTitle(t('PhotoListPage.title'));

  const { photoId } = PhotoViewerHooks.usePageParams();

  PhotoViewerHooks.useInitPage();
  const onIndexReady = PhotoViewerHooks.useOnIndexReady();
  const onIndexChange = PhotoViewerHooks.useOnIndexChange();

  const [state] = useContext(PhotoViewerContext);
  const currPhotoId = state.currPhotoId ?? photoId;

  return (
    <CommonViewerPage
      onIndexReady={onIndexReady}
      onIndexChange={onIndexChange}
      infoSection={currPhotoId ? <PhotoInfoSection photoId={currPhotoId} /> : undefined}
    />
  );
}

export default function PhotoViewerIndex() {
  return (
    <PhotoViewerProvider>
      <PhotoViewerPage />
    </PhotoViewerProvider>
  );
}
