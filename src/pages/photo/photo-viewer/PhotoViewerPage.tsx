import photoListApi from 'src/api/photo/photo-list';
import PhotoSwiper from 'src/components/photo/PhotoSwiper';

export default function PhotoViewerPage() {
  const infiniteQueryResult = photoListApi.useInfiniteApi({});

  return (
    <div className="PhotoViewerPage">
      <PhotoSwiper
        infiniteQueryResult={infiniteQueryResult}
      />
    </div>
  )
}
