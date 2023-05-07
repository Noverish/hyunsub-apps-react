import { t } from 'i18next';
import { useContext } from 'react';

import { PhotoUploadContext, PhotoUploadProvider } from './PhotoUploadContext';
import PhotoFileList from './components/PhotoFileList';
import PhotoFileUpload from './components/PhotoFileUpload';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { setDocumentTitle } from 'src/utils/services';

function PhotoUploadPage() {
  const [state] = useContext(PhotoUploadContext);

  setDocumentTitle(t('PhotoUploadPage.title'));

  return (
    <div className="PhotoUploadPage">
      <MobileHeader title={t('PhotoUploadPage.title')} />
      <CommonContainer>{state.items.length ? <PhotoFileList /> : <PhotoFileUpload />}</CommonContainer>
    </div>
  );
}

export default function PhotoUploadIndex() {
  return (
    <PhotoUploadProvider>
      <PhotoUploadPage />
    </PhotoUploadProvider>
  );
}
