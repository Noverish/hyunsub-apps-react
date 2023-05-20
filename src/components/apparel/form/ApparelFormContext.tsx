import { generateStateContext } from 'src/utils/context';

interface State {
  uploads: File[];
  deletes: string[];
}

const initialState: State = {
  uploads: [],
  deletes: [],
};

export const [ApparelFormContext, ApparelFormProvider] = generateStateContext(initialState);
