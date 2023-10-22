import { generateStateContext } from "src/utils/context";

interface State {
  category: string;
  selects: string[];
}

const initialState: State = {
  category: '',
  selects: [],
}

export const [VideoHistoryContext, VideoHistoryProvider] = generateStateContext(initialState);
