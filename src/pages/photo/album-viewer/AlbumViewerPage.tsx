import albumPhotosApi from 'src/api/photo/album-photos';
import PhotoViewer from 'src/components/photo/PhotoSwiper';
import { useOptionalUrlParams, useUrlParams } from 'src/hooks/url-params';
import { PageData } from 'src/model/api';
import { PhotoPreview } from 'src/model/photo';

export default function AlbumViewerPage() {
  const [albumId] = useUrlParams('albumId');
  const [photoId] = useOptionalUrlParams('photoId');

  // hooks
  const infiniteQueryResult = albumPhotosApi.useInfiniteApi({ albumId, photoId });
  const { data } = infiniteQueryResult;
  const initialPage = getInitialPage(photoId, data?.pages[0]);

  return (
    <div id="AlbumViewerPage">
      <PhotoViewer
        albumId={albumId}
        photoId={photoId}
        infiniteQueryResult={infiniteQueryResult}
        initialSlide={initialPage}
      />
    </div>
  );
}

function getInitialPage(photoId?: string, pageData?: PageData<PhotoPreview>): number | undefined {
  if (!pageData || !photoId) {
    return undefined;
  }

  const { data, page, pageSize } = pageData;

  const i = data.findIndex((v) => v.id === photoId);
  if (i >= 0) {
    return i + page * pageSize;
  } else {
    return undefined;
  }
}
