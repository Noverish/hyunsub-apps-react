import { t } from 'i18next';
import { useContext } from 'react';

import { PhotoViewerContext } from './PhotoViewerContext';
import PhotoViewerHooks from './PhotoViewerHooks';
import PhotoInfoSection from 'src/components/photo/PhotoInfoSection';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import { setDocumentTitle } from 'src/utils/services';

export default function PhotoViewerPage() {
  setDocumentTitle(t('photo.page.photo-list.title'));

  const { photoId } = PhotoViewerHooks.usePageParams();

  PhotoViewerHooks.useInitPage();
  const onIndexReady = PhotoViewerHooks.useOnIndexReady();

  const [state] = useContext(PhotoViewerContext);
  const currPhotoId = photoId ?? state.currPhotoId;

  return (
    <CommonViewerPage
      slides={[]}
      onIndexReady={onIndexReady}
      infoSection={currPhotoId ? <PhotoInfoSection photoId={currPhotoId} /> : undefined}
    />
  );
}
