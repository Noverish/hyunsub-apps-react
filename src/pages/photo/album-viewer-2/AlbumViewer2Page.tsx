import { t } from 'i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import albumDetailV2Api from 'src/api/photo/album-detail-v2';
import PhotoViewer from 'src/components/photo/PhotoViewer';
import { setDocumentTitle } from 'src/utils/services';

export default function AlbumViewer2Page() {
  const albumId = useParams().albumId!!;
  const photoId = useSearchParams()[0].get('photoId') || undefined;

  const album = albumDetailV2Api.useApi({ albumId });

  setDocumentTitle(t('photo.page.album-viewer.title', [album.name]));

  return (
    <div id="AlbumViewerPage">
      <PhotoViewer
        photos={album.photos}
        photoId={photoId}
      />
    </div>
  )
}
