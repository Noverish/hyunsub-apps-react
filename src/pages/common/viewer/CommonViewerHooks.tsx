import { isEqual } from 'lodash';
import { useCallback, useContext, useEffect } from 'react';
import Swiper from 'swiper';
import { Keyboard, Virtual, Zoom } from 'swiper/modules';
import { VirtualData } from 'swiper/types/modules/virtual';

import { CommonViewerPropsContext, CommonViewerPropsWithGeneric } from './CommonViewerPropsContext';
import { CommonViewerStateContext } from './CommonViewerStateContext';
import { CommonViewerData } from './components/CommonViewerSlide';
import { HeaderButton } from 'src/model/component';
import { CommonViewerSwiperContext } from 'src/pages/common/viewer/CommonViewerSwiperContext';
import { useBreakpointMobile } from 'src/utils/breakpoint';
import { useContextSetter } from 'src/utils/context';

export let swiper: Swiper | undefined;

interface SwiperCreateParams<T> {
  slides: T[];
  renderExternal: (data: VirtualData<CommonViewerData>) => void;
  initialIndex?: number;
  isMobile?: boolean;
}

function createSwiper<T>({ slides, renderExternal, initialIndex, isMobile }: SwiperCreateParams<T>): Swiper {
  if (swiper) {
    return swiper;
  }

  const tmp = new Swiper('.swiper', {
    modules: [Virtual, Keyboard, Zoom],
    spaceBetween: 24,
    speed: isMobile ? 300 : 0,
    initialSlide: initialIndex,
    virtual: {
      addSlidesAfter: 1,
      addSlidesBefore: 1,
      slides: slides ?? [],
      renderExternal,
    },
    keyboard: {
      enabled: true,
    },
    zoom: true,
  });
  swiper = tmp;

  return tmp;
}

function destroySwiper() {
  if (swiper) {
    swiper.destroy();
    swiper = undefined;
  }
}

function useSwiper<T>({ slides }: CommonViewerPropsWithGeneric<T>): Swiper | undefined {
  const { initialIndex } = useContext(CommonViewerPropsContext);
  const setSwiperState = useContextSetter(CommonViewerSwiperContext);
  const isMobile = useBreakpointMobile();

  const renderExternal = useCallback(
    (virtualData: VirtualData<CommonViewerData>) => {
      setSwiperState({ virtualData });
    },
    [setSwiperState],
  );

  useEffect(() => {
    if (!swiper) {
      swiper = createSwiper({ slides, renderExternal, initialIndex, isMobile });
    }
  }, [slides, renderExternal, initialIndex, isMobile]);

  useEffect(() => destroySwiper, []);

  return swiper;
}

function useSwiperSlides<T>(swiper: Swiper, { slides, convertSlide }: CommonViewerPropsWithGeneric<T>) {
  useEffect(() => {
    if (!slides) {
      return;
    }

    const virtual = swiper.virtual;

    const oldSlides: CommonViewerData[] = virtual.slides;
    const newSlides: CommonViewerData[] = slides.map((v) => convertSlide(v));
    if (!isEqual(newSlides, oldSlides)) {
      virtual.slides = newSlides;
      virtual.update(true);
    }
  }, [swiper, slides, convertSlide]);
}

const useSwiperSlideChange = (swiper: Swiper) => {
  const { onIndexChange } = useContext(CommonViewerPropsContext);
  const setState = useContextSetter(CommonViewerStateContext);

  const slideChange = useCallback(
    (swiper: Swiper) => {
      const index = swiper.activeIndex;
      setState({ index });
      onIndexChange?.(index);
    },
    [onIndexChange, setState],
  );

  useEffect(() => {
    swiper.on('slideChange', slideChange);

    return () => {
      swiper.off('slideChange', slideChange);
    };
  }, [swiper, slideChange]);
};

const useSwiperIndexReady = (virtualData: VirtualData<CommonViewerData> | undefined) => {
  const { onIndexReady } = useContext(CommonViewerPropsContext);

  const from = virtualData?.from ?? -1;
  const to = virtualData?.to ?? -1;

  useEffect(() => {
    if (from >= 0 && to >= 0) {
      onIndexReady?.(from, to);
    }
  }, [from, to, onIndexReady]);
};

const useSwiperRef = (swiper: Swiper) => {
  const { swiperRef } = useContext(CommonViewerPropsContext);

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current = swiper;
    }
  }, [swiper, swiperRef]);
};

const usePrependSlides = () => {
  return useCallback((data: CommonViewerData[]) => {
    const s = swiper;
    if (!s) {
      return;
    }

    data.reverse().forEach((v) => s.virtual.prependSlide(v as any));
  }, []);
};

const useAppendSlides = () => {
  return useCallback((data: CommonViewerData[]) => {
    const s = swiper;
    if (!s) {
      return;
    }

    data.forEach((v) => s.virtual.appendSlide(v as any));
  }, []);
};

const useSetSlides = () => {
  return useCallback((data: CommonViewerData[], initialIndex?: number) => {
    const s = swiper;
    if (!s) {
      return;
    }

    s.virtual.slides = data;
    s.virtual.update(true);
    if (initialIndex !== undefined) {
      s.slideTo(initialIndex, 0);
    }
  }, []);
};

function useHeaderInfoBtn(): HeaderButton[] {
  const [{ showInfo }, setState] = useContext(CommonViewerStateContext);

  return [
    {
      icon: 'fas fa-info-circle',
      onClick: () => setState({ showInfo: !showInfo }),
    },
  ];
}

const CommonViewerHooks = {
  useSwiper,
  useSwiperSlides,
  useSwiperSlideChange,
  useSwiperIndexReady,
  useSwiperRef,
  usePrependSlides,
  useAppendSlides,
  useSetSlides,
  useHeaderInfoBtn,
};

export default CommonViewerHooks;
