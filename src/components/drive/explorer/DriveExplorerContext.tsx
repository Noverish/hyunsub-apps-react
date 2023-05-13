import { DriveFileSort, DriveFileSorts } from 'src/model/drive';
import { generateStateContext } from 'src/utils/context';

interface State {
  selects: string[];
  lastSelect?: string;
  rename: boolean;
  renameBulk: boolean;
  viewer: boolean;
  sort: DriveFileSort;
  showYoutubeModal: boolean;
}

const initialState: State = {
  selects: [],
  rename: false,
  renameBulk: false,
  viewer: false,
  sort: DriveFileSorts.NAME_ASC,
  showYoutubeModal: false,
};

export const [DriveExplorerContext, DriveExplorerProvider] = generateStateContext(initialState);
