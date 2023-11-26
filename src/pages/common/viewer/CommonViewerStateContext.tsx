import { generateStateContext } from 'src/utils/context';

interface CommonViewerState {
  index: number;
  showHeader: boolean;
  showInfo: boolean;
  showModal: boolean;
}

const initialState: CommonViewerState = {
  index: 0,
  showHeader: true,
  showInfo: false,
  showModal: false,
};

export const [CommonViewerStateContext, CommonViewerStateProvider] =
  generateStateContext<CommonViewerState>(initialState);
