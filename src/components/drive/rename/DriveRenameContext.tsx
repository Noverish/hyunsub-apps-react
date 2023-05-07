import { generateStateContext } from 'src/utils/context';
interface State {
  renames: string[];
}

const initialState: State = {
  renames: [],
}

export const [DriveRenameContext, DriveRenameProvider] = generateStateContext(initialState);
