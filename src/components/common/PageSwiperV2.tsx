import cs from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageSelectModal from 'src/components/common/PageSelectModal';
import Swiper, { Keyboard, Virtual, Zoom } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './PageSwiper.scss';

export interface PageSwiperV2Props<T> {
  page: number;
  setPage: (page: number) => void;
  slides: (T | null)[];
  onPageChange?: (page: number) => void;
  renderSlide: (slide: T | null) => JSX.Element;
  headerRightIcons?: JSX.Element;
  additionalLastSlide?: JSX.Element;
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

export default function PageSwiperV2<T>(props: PageSwiperV2Props<T>) {
  const { slides, page, setPage } = props;
  const [hideHeader, setHideHeader] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef<Swiper>();

  useEffect(() => onPageChangeFromProps(page), [page]);

  const onPageChangeFromProps = (page: number) => {
    const swiper = swiperRef?.current;
    if (swiper && swiper.activeIndex !== page) {
      swiper.slideTo(page);
    }
  }

  const onPageChangeFromSwiper = (swiper: Swiper) => {
    if (swiper.activeIndex !== page) {
      setPage(swiper.activeIndex);
      props.onPageChange?.(swiper.activeIndex);
    }
  }

  const onClick = () => setHideHeader(v => !v);
  const onBack = () => navigate(-1);

  const onShowPageModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowPageModal(true);
  }

  const elements = slides.map((v, i) => (
    <SwiperSlide key={i}>
      <div className="swiper-zoom-container">
        {props.renderSlide(v)}
      </div>
    </SwiperSlide>
  ))

  if (props.additionalLastSlide) {
    elements.push(
      <SwiperSlide key="last">
        <div className="swiper-zoom-container">
          {props.additionalLastSlide}
        </div>
      </SwiperSlide>
    )
  }

  // printSwiperStatus(now, slides);

  return (
    <div id="PageSwiper" onClick={onClick}>
      <div className={cs('swiper_header', { 'd-none': hideHeader })}>
        <div className="left">
          <i className="fas fa-chevron-left" onClick={onBack}></i>
        </div>
        <div className="center" onClick={onShowPageModal}>
          <span id="now_page">{page + 1}</span>
          <span>/</span>
          <span id="max_page">{slides.length}</span>
        </div>
        <div className="right">
          {props.headerRightIcons}
        </div>
      </div>
      <SwiperComponent
        onSwiper={(swiper: Swiper) => swiperRef.current = swiper}
        modules={[Virtual, Keyboard, Zoom]}
        virtual={{ enabled: true, addSlidesAfter: 3, addSlidesBefore: 3 }}
        zoom={true}
        initialSlide={page}
        spaceBetween={24}
        onSlideChange={onPageChangeFromSwiper}
        keyboard={true}
      >
        {elements}
      </SwiperComponent>
      <PageSelectModal
        show={showPageModal}
        onHide={() => setShowPageModal(false)}
        page={page}
        total={slides.length}
        onPageChange={onPageChangeFromProps}
      />
    </div>
  )
}
