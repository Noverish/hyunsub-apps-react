import { generateStateContext } from 'src/utils/context';

interface CommonViewerState {
  index: number;
  showHeader: boolean;
}

const initialState: CommonViewerState = {
  index: 0,
  showHeader: true,
};

export const [CommonViewerStateContext, CommonViewerStateProvider] =
  generateStateContext<CommonViewerState>(initialState);
