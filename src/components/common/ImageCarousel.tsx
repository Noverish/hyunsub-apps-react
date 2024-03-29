import Swiper from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';

import 'swiper/css';

interface Props {
  urls: string[];
}

export default function ImageCarousel({ urls }: Props) {
  const swiperRef = useRef<Swiper>();

  const slides = urls.map((v) => (
    <SwiperSlide key={v} style={{ maxWidth: '360px' }}>
      <div className="ratio ratio-1x1">
        <img src={v} alt={v} />
      </div>
    </SwiperSlide>
  ))

  return (
    <SwiperComponent
      onSwiper={(swiper: Swiper) => swiperRef.current = swiper}
      spaceBetween={24}
      slidesPerView="auto"
    >
      {slides}
    </SwiperComponent>
  )
}
