import { t } from 'i18next';
import { useContext } from 'react';
import { setDocumentTitle } from 'src/utils/services';
import { PhotoUploadContext, PhotoUploadProvider } from 'src/pages/photo/upload/PhotoUploadContext';
import MobileHeader from 'src/components/common/header/MobileHeader';
import CommonContainer from 'src/components/common/header/CommonContainer';
import PhotoFileList from 'src/pages/photo/upload/components/PhotoFileList';
import PhotoFileUpload from 'src/pages/photo/upload/components/PhotoFileUpload';
import { useParams } from 'react-router-dom';
import albumDetailV2Api from 'src/api/photo/album-detail-v2';

function AlbumUploadPage() {
  const albumId = useParams().albumId!!;
  const [state] = useContext(PhotoUploadContext);

  const album = albumDetailV2Api.useApi({ albumId });

  setDocumentTitle(t('PhotoUploadPage.title'));

  return (
    <div className="AlbumUploadPage">
      <MobileHeader title={t('PhotoUploadPage.title')} />
      <CommonContainer>
        <h1>{album.name}</h1>
        {state.items.length ? <PhotoFileList albumId={albumId} /> : <PhotoFileUpload />}
      </CommonContainer>
    </div>
  )
}

export default function AlbumUploadIndex() {
  return (
    <PhotoUploadProvider>
      <AlbumUploadPage />
    </PhotoUploadProvider>
  )
}
