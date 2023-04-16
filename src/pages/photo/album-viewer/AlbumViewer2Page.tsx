import { t } from 'i18next';
import { useSearchParams } from 'react-router-dom';
import PhotoViewer from 'src/components/photo/PhotoViewer';
import { setDocumentTitle } from 'src/utils/services';
import { useAlbumDetailPage } from '../album-detail/AlbumDetailHooks';

export default function AlbumViewer2Page() {
  const { album, photos } = useAlbumDetailPage();

  const photoId = useSearchParams()[0].get('photoId') || undefined;

  setDocumentTitle(t('photo.page.album-viewer.title', [album.name]));

  return (
    <div id="AlbumViewerPage">
      <PhotoViewer
        photos={photos}
        photoId={photoId}
      />
    </div>
  )
}
