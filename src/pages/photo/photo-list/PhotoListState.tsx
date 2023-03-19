import { PhotoPreview } from "src/model/photo";
import { generateContext } from "src/utils/context";

interface State {
  selects: PhotoPreview[];
  selectMode: boolean;
  lastSelected?: PhotoPreview;
  showSelectActionModal: boolean;
  showAlbumSelectModal: boolean;
}

const initialState: State = {
  selects: [],
  selectMode: false,
  showSelectActionModal: false,
  showAlbumSelectModal: false,
}

export const [PhotoListContext, PhotoListProvider] = generateContext(initialState);
