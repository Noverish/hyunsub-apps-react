import { useContext } from 'react';
import Swiper from 'swiper';

import CommonViewerHooks from '../CommonViewerHooks';
import { CommonViewerStateContext } from '../CommonViewerStateContext';
import { CommonViewerSwiperContext, CommonViewerSwiperProvider } from '../CommonViewerSwiperContext';
import CommonViewerSlide, { CommonViewerData } from './CommonViewerSlide';

import 'swiper/css';

function CommonViewerSwiperInner() {
  const swiper = CommonViewerHooks.useSwiper();
  const [{ virtualData }] = useContext(CommonViewerSwiperContext);
  const setState = useContext(CommonViewerStateContext)[1];

  CommonViewerHooks.useSwiperIndexReady(virtualData);

  const offset = virtualData?.offset ?? 0;
  const data: CommonViewerData[] = virtualData?.slides ?? [];
  const slides = data.map((v, i) => <CommonViewerSlide key={v.url ?? i} data={v} offset={offset} />);

  const onClick = () => {
    setState((v) => {
      v.showHeader = !v.showHeader;
    });
  };

  return (
    <div className="swiper" onClick={onClick}>
      <div className="swiper-wrapper">{slides}</div>
      {swiper && <SwiperControl swiper={swiper} />}
    </div>
  );
}

export default function CommonViewerSwiper() {
  return (
    <CommonViewerSwiperProvider>
      <CommonViewerSwiperInner />
    </CommonViewerSwiperProvider>
  );
}

function SwiperControl({ swiper }: { swiper: Swiper }) {
  CommonViewerHooks.useSwiperSlides(swiper);
  CommonViewerHooks.useSwiperSlideChange(swiper);
  CommonViewerHooks.useSwiperRef(swiper);

  return <></>;
}
