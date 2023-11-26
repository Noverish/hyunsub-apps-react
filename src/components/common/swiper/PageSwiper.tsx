import cs from 'classnames';
import React, { useRef, useState } from 'react';
import Swiper from 'swiper';
import { Keyboard, Virtual, Zoom } from 'swiper/modules';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import PageSelectModal from 'src/components/common/PageSelectModal';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import router from 'src/pages/router';

import './PageSwiper.scss';
import 'swiper/css';

export interface PageSwiperProps<T> {
  initialSlide?: number;
  slides: (T | null)[];
  onSlideChange?: (index: number, slide: T | null) => void;
  renderSlide: (slide: T | null) => JSX.Element;
  btns?: MobileHeaderButton[];
  onSwiper?: (swiper: Swiper) => void;
  additionalLastSlide?: JSX.Element;
  titlePrefix?: string;
}

export default function PageSwiper<T>(props: PageSwiperProps<T>) {
  const { slides } = props;

  // hooks
  const [hideHeader, setHideHeader] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);
  const [index, setIndex] = useState(props.initialSlide ?? 0);

  const swiperRef = useRef<Swiper>();
  const swiper = swiperRef.current;

  // functions
  const onClick = () => setHideHeader((v) => !v);
  const onBack = () => router.navigate(-1);

  const onShowPageModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowPageModal(true);
  };

  const onSlideChangeFromSwiper = (swiper: Swiper) => {
    const newIndex = swiper.activeIndex;
    setIndex(newIndex);
    props.onSlideChange?.(swiper.activeIndex, slides[newIndex]);
  };

  const onSlideChangeFromModal = (page: number) => {
    setIndex(page);
    swiper?.slideTo(page, 0);
  };

  const onSwiper = (swiper: Swiper) => {
    swiperRef.current = swiper;
    props.onSwiper?.(swiper);
  };

  // elements
  const elements = slides.map((v, i) => (
    <SwiperSlide key={i} zoom>
      {props.renderSlide(v)}
    </SwiperSlide>
  ));

  if (props.additionalLastSlide) {
    elements.push(
      <SwiperSlide key="last" zoom>
        {props.additionalLastSlide}
      </SwiperSlide>,
    );
  }

  const buttons = (props.btns || []).map((v) => (
    <i
      className={v.icon}
      key={v.icon}
      onClick={(e) => {
        e.stopPropagation();
        v.onClick();
      }}
    />
  ));

  const titlePrefix = props.titlePrefix ? `${props.titlePrefix} - ` : undefined;

  return (
    <div id="PageSwiper" onClick={onClick}>
      <div className={cs('swiper_header', { 'd-none': hideHeader })}>
        <div className="left">
          <i className="fas fa-chevron-left" onClick={onBack}></i>
        </div>
        <div className="center" onClick={onShowPageModal}>
          <span id="now_page">
            {titlePrefix}
            {index + 1}
          </span>
          <span>/</span>
          <span id="max_page">{slides.length}</span>
        </div>
        <div className="right">{buttons}</div>
      </div>
      <SwiperComponent
        onSwiper={onSwiper}
        modules={[Virtual, Keyboard, Zoom]}
        virtual={{ enabled: true, addSlidesAfter: 3, addSlidesBefore: 3 }}
        zoom
        keyboard
        initialSlide={props.initialSlide}
        spaceBetween={24}
        onSlideChange={onSlideChangeFromSwiper}
      >
        {elements}
      </SwiperComponent>
      <PageSelectModal
        show={showPageModal}
        onHide={() => setShowPageModal(false)}
        page={index}
        total={slides.length}
        onPageChange={onSlideChangeFromModal}
      />
    </div>
  );
}
