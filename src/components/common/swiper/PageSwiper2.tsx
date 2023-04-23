import cs from 'classnames';
import React, { useRef, useState } from 'react';
import PageSelectModal from 'src/components/common/PageSelectModal';
import Swiper, { Keyboard, Virtual, Zoom } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import router from 'src/pages/router';
import 'swiper/css';
import './PageSwiper.scss';

export interface PageSwiperProps<T> {
  initialSlide?: number;
  slides: T[];
  onSlideChange?: (index: number) => void;
  renderSlide: (slide: T) => JSX.Element;
  headerRightIcons?: JSX.Element;
  onSwiper?: (swiper: Swiper) => void;
}

// function printSwiperStatus<T>(slide: number, slides: (T | null)[]) {
//   const list = slides.map((v, i) => {
//     if (i === slide) return 'X';
//     else if (v) return 'O';
//     else return '_';
//   });
//   const str = chunk(list, 48).map(v => v.join('')).join('\n');
//   console.log(str);
// }

export default function PageSwiper<T>(props: PageSwiperProps<T>) {
  const { slides } = props;

  // hooks
  const [hideHeader, setHideHeader] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);
  const [index, setIndex] = useState(props.initialSlide ?? 0);

  const swiperRef = useRef<Swiper>();
  const swiper = swiperRef.current;

  // functions
  const onClick = () => setHideHeader(v => !v);
  const onBack = () => router.navigate(-1);

  const onShowPageModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowPageModal(true);
  }

  const onSlideChange = (swiper: Swiper) => {
    const newIndex = swiper.activeIndex;
    setIndex(newIndex);
    props.onSlideChange?.(swiper.activeIndex);
  }

  const onPageChange = (page: number) => {
    setIndex(page);
    swiper?.slideTo(page, 0);
  }

  const onSwiper = (swiper: Swiper) => {
    swiperRef.current = swiper;
    props.onSwiper?.(swiper);
  }

  // elements
  const elements = slides.map((v, i) => (
    <SwiperSlide key={i} zoom={true}>
      {props.renderSlide(v)}
    </SwiperSlide>
  ))

  return (
    <div id="PageSwiper" onClick={onClick}>
      <div className={cs('swiper_header', { 'd-none': hideHeader })}>
        <div className="left">
          <i className="fas fa-chevron-left" onClick={onBack}></i>
        </div>
        <div className="center" onClick={onShowPageModal}>
          <span id="now_page">{index + 1}</span>
          <span>/</span>
          <span id="max_page">{slides.length}</span>
        </div>
        <div className="right">
          {props.headerRightIcons}
        </div>
      </div>
      <SwiperComponent
        onSwiper={onSwiper}
        modules={[Virtual, Keyboard, Zoom]}
        virtual={{ enabled: true, addSlidesAfter: 3, addSlidesBefore: 3 }}
        zoom={true}
        keyboard={true}
        initialSlide={props.initialSlide}
        spaceBetween={24}
        onSlideChange={onSlideChange}
      >
        {elements}
      </SwiperComponent>
      <PageSelectModal
        show={showPageModal}
        onHide={() => setShowPageModal(false)}
        page={index}
        total={slides.length}
        onPageChange={onPageChange}
      />
    </div>
  )
}
