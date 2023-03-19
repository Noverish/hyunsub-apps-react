import { PhotoPreview } from "src/model/photo";
import { generateContext } from "src/utils/context";

interface State {
  selects: PhotoPreview[];
  selectMode: boolean;
}

const initialState: State = {
  selects: [],
  selectMode: false,
}

export const [PhotoListContext, PhotoListProvider] = generateContext(initialState);
