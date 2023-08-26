import { generateStateContext } from 'src/utils/context';

interface State {
  showUsernameModal: boolean;
  showPasswordModal: boolean;
}

const initialState: State = {
  showUsernameModal: false,
  showPasswordModal: false,
};

export const [ProfileContext, ProfileProvider] = generateStateContext<State>(initialState);
