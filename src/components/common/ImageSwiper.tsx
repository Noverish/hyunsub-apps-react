import Swiper from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';

import 'swiper/css';

interface Props {
  urls: string[];
}

export default function ImageSwiper({ urls }: Props) {
  const swiperRef = useRef<Swiper>();

  const slides = urls.map((v) => (
    <SwiperSlide key={v} style={{ width: '480px' }}>
      <div className="ratio ratio-1x1">
        <img src={v} alt={v} style={{ maxWidth: '100%', maxHeight: '100%' }} />
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
