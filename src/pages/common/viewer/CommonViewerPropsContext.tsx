import { MutableRefObject } from 'react';
import Swiper from 'swiper';

import { CommonViewerData } from './components/CommonViewerSlide';
import { MobileHeaderButton } from 'src/components/common/header/MobileHeader';
import { generateValueContext } from 'src/utils/context';

export interface CommonViewerProps {
  slides: CommonViewerData[];
  total?: number;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  onIndexReady?: (from: number, to: number) => void;
  headerBtns?: MobileHeaderButton[];
  titlePrefix?: string;
  swiperRef?: MutableRefObject<Swiper | undefined>;
}

export const [CommonViewerPropsContext, CommonViewerPropsProvider] = generateValueContext<CommonViewerProps>();
