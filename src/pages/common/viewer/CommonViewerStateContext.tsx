import { generateStateContext } from 'src/utils/context';

interface CommonViewerState {
  index: number;
  showHeader: boolean;
  showInfo: boolean;
}

const initialState: CommonViewerState = {
  index: 0,
  showHeader: true,
  showInfo: false,
};

export const [CommonViewerStateContext, CommonViewerStateProvider] =
  generateStateContext<CommonViewerState>(initialState);
