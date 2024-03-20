import { useContext } from 'react';
import Swiper from 'swiper';

import CommonViewerHooks from '../CommonViewerHooks';
import { CommonViewerStateContext } from '../CommonViewerStateContext';
import { CommonViewerSwiperContext, CommonViewerSwiperProvider } from '../CommonViewerSwiperContext';
import CommonViewerSlide, { CommonViewerData } from './CommonViewerSlide';
import { CommonViewerPropsWithGeneric } from 'src/pages/common/viewer/CommonViewerPropsContext';
import { useContextSetter } from 'src/utils/context';

import 'swiper/css';

function CommonViewerSwiperInner<T>(props: CommonViewerPropsWithGeneric<T>) {
  const swiper = CommonViewerHooks.useSwiper(props);
  const [{ virtualData }] = useContext(CommonViewerSwiperContext);
  const setState = useContextSetter(CommonViewerStateContext);

  CommonViewerHooks.useSwiperIndexReady(virtualData);

  const offset = virtualData?.offset ?? 0;
  const data: CommonViewerData[] = virtualData?.slides ?? [];
  const slideElements = data.map((v, i) => <CommonViewerSlide key={v.url ?? i} data={v} offset={offset} />);

  const onClick = () => {
    setState((v) => {
      v.showHeader = !v.showHeader;
    });
  };

  return (
    <div className="swiper" onClick={onClick}>
      <div className="swiper-wrapper">{slideElements}</div>
      {swiper && <SwiperControl swiper={swiper} {...props} />}
    </div>
  );
}

export default function CommonViewerSwiper<T>(props: CommonViewerPropsWithGeneric<T>) {
  return (
    <CommonViewerSwiperProvider>
      <CommonViewerSwiperInner {...props} />
    </CommonViewerSwiperProvider>
  );
}

interface SwiperControlProps<T> extends CommonViewerPropsWithGeneric<T> {
  swiper: Swiper;
}

function SwiperControl<T>({ swiper, ...etc }: SwiperControlProps<T>) {
  CommonViewerHooks.useSwiperSlides(swiper, etc);
  CommonViewerHooks.useSwiperSlideChange(swiper);
  CommonViewerHooks.useSwiperRef(swiper);

  return <></>;
}
