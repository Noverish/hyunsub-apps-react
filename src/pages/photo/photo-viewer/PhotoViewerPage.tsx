import flatten from 'lodash/flatten';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import photoListApi from 'src/api/photo/photo-list';
import InfinitePageSwiper from 'src/components/common/swiper/InfinitePageSwiper';
import { PhotoPreview } from 'src/model/photo';

function renderSlide(photo: PhotoPreview | null) {
  if (photo === null) {
    return <Spinner animation="border"></Spinner>;
  }

  if (photo.type === 'VIDEO') {
    const url = photo.thumbnail.replace('thumbnail', 'video').replace('.jpg', '.mp4');
    return <video controls><source src={url} type="video/mp4" /></video>
  }

  const url = photo.thumbnail.replace('thumbnail', 'original').replace('jpg', photo.ext);
  return <img src={`${url}?size=1024`} alt={photo.id.toString()} />;
}

export default function PhotoViewerPage() {
  const { data, fetchNextPage } = photoListApi.useInfiniteApi({});
  const photos = flatten(data?.pages.map(v => v.data) ?? []);

  const photoId = useSearchParams()[0].get('photoId')!!;
  const initialPage = photos.findIndex(v => v.id === photoId);
  const [slide, setSlide] = useState(initialPage);

  const onSlideChange = (slide: number) => {
    const nowPhoto = photos[slide];
    window.history.replaceState(null, '', `?photoId=${nowPhoto.id}`);
  }

  const fetchSlides = (page: number) => {
    fetchNextPage({ pageParam: page });
  }

  return (
    <div className="PhotoViewerPage">
      <InfinitePageSwiper
        pageState={[slide, setSlide]}
        data={data!!}
        readyOffSlideSize={2}
        fetchSlides={fetchSlides}
        initialPage={initialPage}
        renderSlide={renderSlide}
        onPageChange={onSlideChange}
      />
    </div>
  )
}
