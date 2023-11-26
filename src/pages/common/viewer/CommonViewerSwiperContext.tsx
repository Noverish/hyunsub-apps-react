import { VirtualData } from 'swiper/types/modules/virtual';

import { CommonViewerData } from './components/CommonViewerSlide';
import { generateStateContext } from 'src/utils/context';

interface CommonViewerSwiperState {
  virtualData?: VirtualData<CommonViewerData>;
}

const initialState: CommonViewerSwiperState = {};

export const [CommonViewerSwiperContext, CommonViewerSwiperProvider] =
  generateStateContext<CommonViewerSwiperState>(initialState);
