import { t } from 'i18next';
import { useContext } from 'react';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { setDocumentTitle } from 'src/utils/services';
import PhotoFileList from './components/PhotoFileList';
import PhotoFileUpload from './components/PhotoFileUpload';
import { PhotoUploadContext, PhotoUploadProvider } from './PhotoUploadContext';

function PhotoUploadPage() {
  const [state] = useContext(PhotoUploadContext);

  setDocumentTitle(t('PhotoUploadPage.title'));

  return (
    <div className="PhotoUploadPage">
      <MobileHeader title={t('PhotoUploadPage.title')} />
      <CommonContainer>
        {state.items.length ? <PhotoFileList /> : <PhotoFileUpload />}
      </CommonContainer>
    </div>
  )
}

export default function PhotoUploadIndex() {
  return (
    <PhotoUploadProvider>
      <PhotoUploadPage />
    </PhotoUploadProvider>
  )
}
