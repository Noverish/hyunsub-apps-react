import { Spinner } from 'react-bootstrap';
import InfinitePageSwiper, { InfinitePageSwiperProps } from 'src/components/common/swiper/InfinitePageSwiper';
import { PhotoPreview } from 'src/model/photo';

export type PhotoSwiperProps = Omit<InfinitePageSwiperProps<PhotoPreview>, 'renderSlide'>

export default function PhotoSwiper(props: PhotoSwiperProps) {
  return (
    <InfinitePageSwiper
      {...props}
      renderSlide={renderSlide}
    />
  )
}

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
