import { createContext, useState } from 'react';

interface State {
  isChooseMode: boolean;
  choices: string[];
  toggleChooseMode: () => void;
  onChoose: (choice: string) => void;
  clearChooseContext: () => void;
}

const initialState: State = {
  isChooseMode: false,
  choices: [],
  toggleChooseMode: () => {},
  onChoose: () => {},
  clearChooseContext: () => {},
};

export const ChooseContext = createContext<State>(initialState);

interface Props {
  children: React.ReactNode;
}

export const ChooseProvider = ({ children }: Props) => {
  const [isChooseMode, setChooseMode] = useState(initialState.isChooseMode);
  const [choices, setChoices] = useState(initialState.choices);

  const onChoose = (choice: string) => {
    const isChosen = choices.includes(choice);
    if (isChosen) {
      setChoices((v) => v.filter((v) => v !== choice));
    } else {
      setChoices((v) => [...v, choice]);
    }
  };

  const clearChooseContext = () => {
    setChooseMode(false);
    setChoices([]);
  };

  const state = {
    isChooseMode: isChooseMode,
    choices: choices,
    toggleChooseMode: () => setChooseMode((v) => !v),
    onChoose,
    clearChooseContext,
  };

  return <ChooseContext.Provider value={state}>{children}</ChooseContext.Provider>;
};
