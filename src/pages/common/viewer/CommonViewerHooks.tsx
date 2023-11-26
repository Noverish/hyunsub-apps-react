import { isEqual } from 'lodash';
import { useCallback, useContext, useEffect } from 'react';
import Swiper from 'swiper';
import { Keyboard, Virtual, Zoom } from 'swiper/modules';
import { VirtualData } from 'swiper/types/modules/virtual';

import { CommonViewerPropsContext } from './CommonViewerPropsContext';
import { CommonViewerStateContext } from './CommonViewerStateContext';
import { CommonViewerData } from './components/CommonViewerSlide';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { CommonViewerSwiperContext } from 'src/pages/common/viewer/CommonViewerSwiperContext';

export let swiper: Swiper | undefined;

interface SwiperCreateParams {
  slides: CommonViewerData[];
  renderExternal: (data: VirtualData<CommonViewerData>) => void;
  initialIndex?: number;
}

function createSwiper({ slides, renderExternal, initialIndex }: SwiperCreateParams): Swiper {
  if (swiper) {
    return swiper;
  }

  const tmp = new Swiper('.swiper', {
    modules: [Virtual, Keyboard, Zoom],
    spaceBetween: 24,
    initialSlide: initialIndex,
    virtual: {
      addSlidesAfter: 1,
      addSlidesBefore: 1,
      slides,
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

function useSwiper(): Swiper | undefined {
  const { initialIndex, slides } = useContext(CommonViewerPropsContext);
  const setSwiperState = useContext(CommonViewerSwiperContext)[1];

  const renderExternal = useCallback(
    (virtualData: VirtualData<CommonViewerData>) => {
      setSwiperState({ virtualData });
    },
    [setSwiperState],
  );

  useEffect(() => {
    if (!swiper) {
      swiper = createSwiper({ slides, renderExternal, initialIndex });
    }
  }, [slides, renderExternal, initialIndex]);

  useEffect(() => destroySwiper, []);

  return swiper;
}

const useSwiperSlides = (swiper: Swiper) => {
  const { slides } = useContext(CommonViewerPropsContext);

  useEffect(() => {
    const virtual = swiper.virtual;

    const oldSlides = virtual.slides;
    const newSlides = slides;
    if (!isEqual(newSlides, oldSlides)) {
      virtual.slides = newSlides;
      virtual.update(true);
    }
  }, [swiper, slides]);
};

const useSwiperSlideChange = (swiper: Swiper) => {
  const { onIndexChange } = useContext(CommonViewerPropsContext);
  const setState = useContext(CommonViewerStateContext)[1];

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

function useHeaderInfoBtn(): MobileHeaderButton[] {
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
