import { PhotoPreview } from 'src/model/photo';
import { generateStateContext } from 'src/utils/context';

interface State {
  selects: PhotoPreview[];
  selectMode: boolean;
  lastSelected?: PhotoPreview;
  showSelectActionModal: boolean;
}

const initialState: State = {
  selects: [],
  selectMode: false,
  showSelectActionModal: false,
};

export const [PhotoSelectContext, PhotoSelectProvider] = generateStateContext(initialState);
