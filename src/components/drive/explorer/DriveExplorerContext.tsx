import { generateStateContext } from "src/utils/context";

interface State {
  selects: string[];
  lastSelect?: string;
  rename: boolean;
  renameBulk: boolean;
  viewer: boolean;
}

const initialState: State = {
  selects: [],
  rename: false,
  renameBulk: false,
  viewer: false,
}

export const [DriveExplorerContext, DriveExplorerProvider] = generateStateContext(initialState);
