import cs from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageSelectModal from 'src/components/common/PageSelectModal';
import Swiper, { Keyboard, Virtual, Zoom } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './PageSwiper.scss';

export interface PageSwiperProps<T> {
  pageState?: [number, (page: number) => void];
  initialPage?: number;
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

export default function PageSwiper<T>(props: PageSwiperProps<T>) {
  const { slides, pageState, onPageChange } = props;
  const [hideHeader, setHideHeader] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef<Swiper>();

  const [tmp, setTmp] = useState(props.initialPage || 0);
  const now = pageState ? pageState[0] : tmp;
  const setNow = pageState ? pageState[1] : setTmp;

  const onPageChangeNotFromSwiper = useCallback((page: number) => {
    setNow(page);
    const swiper: Swiper | undefined = swiperRef?.current;
    if (swiper && swiper.activeIndex !== page) {
      swiper.slideTo(page, 0);
    }
  }, [setNow]);

  const onPageChangeFromSwiper = useCallback((swiper: Swiper) => {
    if (swiper.activeIndex !== now) {
      setNow(swiper.activeIndex);
      onPageChange?.(swiper.activeIndex);
    }
  }, [now, setNow, onPageChange]);

  const pageFromProps = pageState?.[0];
  useEffect(() => {
    if (pageFromProps !== undefined) {
      onPageChangeNotFromSwiper(pageFromProps)
    }
  }, [onPageChangeNotFromSwiper, pageFromProps]);

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

  // printSwiperStatus(page, slides);

  return (
    <div id="PageSwiper" onClick={onClick}>
      <div className={cs('swiper_header', { 'd-none': hideHeader })}>
        <div className="left">
          <i className="fas fa-chevron-left" onClick={onBack}></i>
        </div>
        <div className="center" onClick={onShowPageModal}>
          <span id="now_page">{now + 1}</span>
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
        initialSlide={now}
        spaceBetween={24}
        onSlideChange={onPageChangeFromSwiper}
        keyboard={true}
      >
        {elements}
      </SwiperComponent>
      <PageSelectModal
        show={showPageModal}
        onHide={() => setShowPageModal(false)}
        page={now}
        total={slides.length}
        onPageChange={onPageChangeNotFromSwiper}
      />
    </div>
  )
}
