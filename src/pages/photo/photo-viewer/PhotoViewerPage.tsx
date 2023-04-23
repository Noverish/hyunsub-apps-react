import photoListApi from 'src/api/photo/photo-list';
import PhotoSwiper2 from 'src/components/photo/PhotoSwiper2';
import { useOptionalUrlParams } from 'src/hooks/url-params';

export default function PhotoViewerPage() {
  const [photoId] = useOptionalUrlParams('photoId');

  const infiniteQueryResult = photoListApi.useInfiniteApi({ photoId });

  const { infiniteData } = infiniteQueryResult
  const initialPage = photoId ? infiniteData.findIndex(v => v.id === photoId) : undefined;

  return (
    <div className="PhotoViewerPage">
      <PhotoSwiper2
        infiniteQueryResult={infiniteQueryResult}
        initialSlide={initialPage}
      />
    </div>
  )
}
