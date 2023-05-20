import { useRef } from 'react';
import Swiper, { Pagination } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import { useBreakpointMobile } from 'src/utils/breakpoint';

import './ImageCarousel.scss';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  urls: string[];
}

export default function ImageCarousel({ urls }: Props) {
  const swiperRef = useRef<Swiper>();
  const isMobile = useBreakpointMobile();

  const slides = urls.map((v) => (
    <SwiperSlide key={v}>
      <div className="ratio ratio-1x1">
        <img src={v} alt={v} />
      </div>
    </SwiperSlide>
  ));

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
