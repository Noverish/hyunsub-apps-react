import { t } from 'i18next';
import { useContext } from 'react';

import AlbumUploadHooks from './AlbumUploadHooks';
import albumDetailApi from 'src/api/photo/album-detail';
import CommonLayout from 'src/components/common/layout/CommonLayout';
import { PhotoUploadContext, PhotoUploadProvider } from 'src/pages/photo/upload/PhotoUploadContext';
import PhotoUploadList from 'src/pages/photo/upload/components/PhotoUploadList';
import PhotoUploadZone from 'src/pages/photo/upload/components/PhotoUploadZone';

function AlbumUploadPage() {
  const { albumId } = AlbumUploadHooks.usePageParams();
  const [state] = useContext(PhotoUploadContext);
  const { data } = albumDetailApi.useApiResult({ albumId });

  const titleSection = (
    <section className="title_section">
      <div className="album_name">{data?.name ?? ''}</div>
      <div className="photo_num">{t('photo.page.album-detail.photo-num', [data?.total ?? 0])}</div>
    </section>
  );

  return (
    <CommonLayout className="AlbumUploadPage" title={t('PhotoUploadPage.title')} back>
      {titleSection}
      {state.items.length ? <PhotoUploadList albumId={albumId} /> : <PhotoUploadZone />}
    </CommonLayout>
  );
}

export default function AlbumUploadIndex() {
  return (
    <PhotoUploadProvider>
      <AlbumUploadPage />
    </PhotoUploadProvider>
  );
}
