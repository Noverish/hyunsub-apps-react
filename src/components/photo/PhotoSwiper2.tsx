import InfinitePageSwiper2, { InfinitePageSwiperProps } from 'src/components/common/swiper/InfinitePageSwiper2';
import { PhotoPreview } from 'src/model/photo';
import { renderSlide } from './PhotoSwiper';

export type PhotoSwiperProps = Omit<InfinitePageSwiperProps<PhotoPreview>, 'renderSlide'>

export default function PhotoSwiper(props: PhotoSwiperProps) {
  return (
    <InfinitePageSwiper2
      renderSlide={renderSlide}
      {...props}
    />
  )
}
