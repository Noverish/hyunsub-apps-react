import { t } from 'i18next';

import PhotoViewerHooks from './PhotoViewerHooks';
import CommonViewerPage from 'src/pages/common/viewer/CommonViewerPage';
import { setDocumentTitle } from 'src/utils/services';

export default function PhotoViewerPage() {
  setDocumentTitle(t('photo.page.photo-list.title'));

  PhotoViewerHooks.useInitPage();
  const onIndexReady = PhotoViewerHooks.useOnIndexReady();

  return <CommonViewerPage slides={[]} onIndexReady={onIndexReady} />;
}
