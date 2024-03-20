import { MutableRefObject } from 'react';
import Swiper from 'swiper';

import { CommonViewerData } from './components/CommonViewerSlide';
import { HeaderButton } from 'src/model/component';
import { generateValueContext } from 'src/utils/context';

interface CommonViewerPropsWithoutGeneric {
  total?: number;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  onIndexReady?: (from: number, to: number) => void;
  headerBtns?: HeaderButton[];
  titlePrefix?: string;
  swiperRef?: MutableRefObject<Swiper | undefined>;
}

export interface CommonViewerPropsWithGeneric<T> {
  slides: T[];
  convertSlide: (t: T) => CommonViewerData;
  renderInfoSection?: (t: T) => React.ReactNode;
}

export type CommonViewerProps<T> = CommonViewerPropsWithoutGeneric & CommonViewerPropsWithGeneric<T>;

export const [CommonViewerPropsContext, CommonViewerPropsProvider] =
  generateValueContext<CommonViewerPropsWithoutGeneric>();
