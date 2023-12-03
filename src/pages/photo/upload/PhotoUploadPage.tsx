import { t } from 'i18next';
import { useContext } from 'react';

import { PhotoUploadContext, PhotoUploadProvider } from './PhotoUploadContext';
import PhotoUploadList from './components/PhotoUploadList';
import PhotoUploadZone from './components/PhotoUploadZone';
import CommonLayout from 'src/components/common/layout/CommonLayout';

function PhotoUploadPage() {
  const [state] = useContext(PhotoUploadContext);

  return (
    <CommonLayout className="PhotoUploadPage" title={t('PhotoUploadPage.title')} back>
      {state.items.length ? <PhotoUploadList /> : <PhotoUploadZone />}
    </CommonLayout>
  );
}

export default function PhotoUploadIndex() {
  return (
    <PhotoUploadProvider>
      <PhotoUploadPage />
    </PhotoUploadProvider>
  );
}
