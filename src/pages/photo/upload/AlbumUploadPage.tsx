import { t } from 'i18next';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import albumDetailApi from 'src/api/photo/album-detail';
import CommonContainer from 'src/components/common/header/CommonContainer';
import MobileHeader from 'src/components/common/header/MobileHeader';
import { PhotoUploadContext, PhotoUploadProvider } from 'src/pages/photo/upload/PhotoUploadContext';
import PhotoFileList from 'src/pages/photo/upload/components/PhotoFileList';
import PhotoFileUpload from 'src/pages/photo/upload/components/PhotoFileUpload';
import { setDocumentTitle } from 'src/utils/services';

function AlbumUploadPage() {
  const albumId = useParams().albumId!!;
  const [state] = useContext(PhotoUploadContext);
  const album = albumDetailApi.useApi({ albumId });

  setDocumentTitle(t('PhotoUploadPage.title'));

  const titleSectionForDesktop = (
    <section className="title_section">
      <div className="album_name">{album.name}</div>
      <div className="photo_num">{t('photo.page.album-detail.photo-num', [album.photos.total])}</div>
    </section>
  )

  return (
    <div className="AlbumUploadPage">
      <MobileHeader title={t('PhotoUploadPage.title')} back />
      <CommonContainer>
        {titleSectionForDesktop}
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
