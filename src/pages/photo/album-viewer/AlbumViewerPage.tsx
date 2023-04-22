import { useSearchParams } from 'react-router-dom';
import albumPhotosApi from 'src/api/photo/album-photos';
import PhotoViewer from 'src/components/photo/PhotoSwiper';
import { useUrlParams } from 'src/hooks/url-params';
import { PageData } from 'src/model/api';
import { PhotoPreview } from 'src/model/photo';

export default function AlbumViewerPage() {
  const [albumId] = useUrlParams('albumId');
  const photoId = useSearchParams()[0].get('photoId');

  const infiniteQueryResult = albumPhotosApi.useInfiniteApi({ albumId, photoId });
  const { data } = infiniteQueryResult;
  const initialPage = getInitialPage(photoId, data?.pages[0]);

  return (
    <div id="AlbumViewerPage">
      <PhotoViewer
        infiniteQueryResult={infiniteQueryResult}
        initialPage={initialPage}
      />
    </div>
  )
}

function getInitialPage(photoId: string | null, pageData?: PageData<PhotoPreview>): number | undefined {
  if (!pageData || !photoId) {
    return undefined;
  }

  const { data, page, pageSize } = pageData;

  const i = data.findIndex(v => v.id === photoId);
  if (i >= 0) {
    return i + page * pageSize;
  } {
    return undefined;
  }
}
