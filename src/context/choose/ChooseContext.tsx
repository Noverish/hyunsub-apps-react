import { createContext, useRef, useState } from 'react';

interface State {
  isChooseMode: boolean;
  choices: string[];
  toggleChooseMode: () => void;
  onChoose: (choice: string, shiftKey: boolean) => void;
  clearChooseContext: () => void;
  setData: (data: string[]) => void;
}

const initialState: State = {
  isChooseMode: false,
  choices: [],
  toggleChooseMode: () => {},
  onChoose: () => {},
  clearChooseContext: () => {},
  setData: () => {},
};

export const ChooseContext = createContext<State>(initialState);

interface Props {
  children: React.ReactNode;
}

export const ChooseProvider = ({ children }: Props) => {
  const [isChooseMode, setChooseMode] = useState(initialState.isChooseMode);
  const [choices, setChoices] = useState(initialState.choices);
  const [lastChoice, setLastChoice] = useState<string>();
  const dataRef = useRef<string[]>([]);
  const data = dataRef.current;

  const onChoose = (choice: string, shiftKey: boolean) => {
    const isChosen = choices.includes(choice);

    if (!isChosen && shiftKey && lastChoice) {
      const index1 = data.indexOf(choice);
      const index2 = data.indexOf(lastChoice);
      const [start, end] = [index1, index2].sort((a, b) => a - b);
      const list = data.slice(start, end + 1);
      const set = new Set([...choices, ...list]);
      setChoices(Array.from(set));
      return;
    }

    if (isChosen) {
      setLastChoice(undefined);
      setChoices((v) => v.filter((v) => v !== choice));
    } else {
      setLastChoice(choice);
      setChoices((v) => [...v, choice]);
    }
  };

  const clearChooseContext = () => {
    setChooseMode(false);
    setChoices([]);
  };

  const setData = (newData: string[]) => (dataRef.current = newData);

  const state = {
    isChooseMode: isChooseMode,
    choices: choices,
    toggleChooseMode: () => setChooseMode((v) => !v),
    onChoose,
    clearChooseContext,
    setData,
  };

  return <ChooseContext.Provider value={state}>{children}</ChooseContext.Provider>;
};
