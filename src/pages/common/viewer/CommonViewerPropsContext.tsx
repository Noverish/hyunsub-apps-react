import { MutableRefObject } from 'react';
import Swiper from 'swiper';

import { CommonViewerData } from './components/CommonViewerSlide';
import { HeaderButton } from 'src/model/component';
import { generateValueContext } from 'src/utils/context';

export interface CommonViewerProps {
  slides?: CommonViewerData[];
  total?: number;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  onIndexReady?: (from: number, to: number) => void;
  headerBtns?: HeaderButton[];
  infoSection?: JSX.Element;
  titlePrefix?: string;
  swiperRef?: MutableRefObject<Swiper | undefined>;
}

export const [CommonViewerPropsContext, CommonViewerPropsProvider] = generateValueContext<CommonViewerProps>();
