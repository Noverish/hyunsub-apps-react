import { useRef } from 'react';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import { useBreakpointMobile } from 'src/utils/breakpoint';

import './ImageCarousel.scss';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props<T> {
  data: T[];
  urlSelector: (value: T) => string;
  onClick?: (value: T) => void;
}

export default function ImageCarousel<T>({ data, urlSelector, onClick }: Props<T>) {
  const swiperRef = useRef<Swiper>();
  const isMobile = useBreakpointMobile();

  const slides = data.map((v) => {
    const url = urlSelector(v);

    const onSlideClick = () => {
      onClick?.(v);
    };

    return (
      <SwiperSlide key={url}>
        <div className="ratio ratio-1x1" onClick={onSlideClick}>
          <img src={url} alt={url} />
        </div>
      </SwiperSlide>
    );
  });

  return (
    <SwiperComponent
      className="ImageCarousel"
      onSwiper={(swiper: Swiper) => (swiperRef.current = swiper)}
      modules={[Pagination]}
      pagination
      spaceBetween={24}
      slidesPerView={isMobile ? undefined : 'auto'}
    >
      {slides}
    </SwiperComponent>
  );
}
